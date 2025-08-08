// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// RestaurantHub.sol

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RestaurantHub is Ownable, ReentrancyGuard {
    
    enum RestaurantStatus { Pending, Active, Suspended, Banned }
    enum CuisineType { American, Chinese, Italian, Mexican, Indian, Japanese, Other }
    
    struct Restaurant {
        address restaurantAddress;
        string name;
        CuisineType cuisineType;
        RestaurantStatus status;
        uint256 totalOrders;
        uint256 completedOrders;
        uint256 averageRating; // Scaled by 100
        uint256 totalRatings;
        uint256 stakingAmount;
        uint256 registeredAt;
        bool isOpen;
    }
    
    struct MenuItem {
        uint256 itemId;
        string name;
        uint256 price;
        string category;
        bool isAvailable;
    }
    
    mapping(address => Restaurant) public restaurants;
    mapping(address => MenuItem[]) public restaurantMenus;
    mapping(address => uint256) public nextItemId;
    mapping(address => bool) public verifiers;
    address[] public activeRestaurants;
    
    uint256 public minStakingAmount = 0.05 ether;
    uint256 public registrationFee = 0.005 ether;
    uint256 public totalRegisteredRestaurants;
    
    event RestaurantRegistered(address indexed restaurant, string name, CuisineType cuisine);
    event RestaurantVerified(address indexed restaurant, RestaurantStatus status);
    event MenuItemAdded(address indexed restaurant, uint256 itemId, string name, uint256 price);
    event RestaurantStatusChanged(address indexed restaurant, bool isOpen);
    
    error InsufficientStaking();
    error RestaurantNotFound();
    error UnauthorizedVerifier();
    error InvalidPrice();
    error MenuItemNotFound();
    
    modifier restaurantExists(address _restaurant) {
        if (restaurants[_restaurant].restaurantAddress == address(0)) revert RestaurantNotFound();
        _;
    }
    
    modifier onlyVerifier() {
        if (!verifiers[msg.sender] && msg.sender != owner()) revert UnauthorizedVerifier();
        _;
    }
    
    modifier onlyRestaurant(address _restaurant) {
        require(msg.sender == _restaurant, "Not restaurant owner");
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        verifiers[initialOwner] = true;
    }
    
    function setVerifier(address _verifier, bool _status) external onlyOwner {
        verifiers[_verifier] = _status;
    }
    
    function registerRestaurant(
        string calldata _name,
        CuisineType _cuisineType
    ) external payable nonReentrant {
        require(msg.value >= registrationFee + minStakingAmount, "Insufficient payment");
        require(restaurants[msg.sender].restaurantAddress == address(0), "Already registered");
        
        uint256 stakingAmount = msg.value - registrationFee;
        
        restaurants[msg.sender] = Restaurant({
            restaurantAddress: msg.sender,
            name: _name,
            cuisineType: _cuisineType,
            status: RestaurantStatus.Pending,
            totalOrders: 0,
            completedOrders: 0,
            averageRating: 500, // Start at 5.0
            totalRatings: 0,
            stakingAmount: stakingAmount,
            registeredAt: block.timestamp,
            isOpen: false
        });
        
        nextItemId[msg.sender] = 1;
        totalRegisteredRestaurants++;
        
        emit RestaurantRegistered(msg.sender, _name, _cuisineType);
    }
    
    function verifyRestaurant(address _restaurant, RestaurantStatus _status) 
        external 
        onlyVerifier 
        restaurantExists(_restaurant) 
    {
        Restaurant storage restaurant = restaurants[_restaurant];
        require(restaurant.status == RestaurantStatus.Pending, "Already processed");
        
        restaurant.status = _status;
        
        if (_status == RestaurantStatus.Active) {
            activeRestaurants.push(_restaurant);
        } else if (_status == RestaurantStatus.Banned) {
            // Refund staking
            payable(_restaurant).transfer(restaurant.stakingAmount);
            restaurant.stakingAmount = 0;
        }
        
        emit RestaurantVerified(_restaurant, _status);
    }
    
    function setRestaurantOpen(bool _isOpen) 
        external 
        restaurantExists(msg.sender) 
    {
        Restaurant storage restaurant = restaurants[msg.sender];
        require(restaurant.status == RestaurantStatus.Active, "Not active");
        
        restaurant.isOpen = _isOpen;
        
        emit RestaurantStatusChanged(msg.sender, _isOpen);
    }
    
    function addMenuItem(
        string calldata _name,
        uint256 _price,
        string calldata _category
    ) external restaurantExists(msg.sender) {
        if (_price == 0) revert InvalidPrice();
        
        Restaurant storage restaurant = restaurants[msg.sender];
        require(restaurant.status == RestaurantStatus.Active, "Not active");
        
        uint256 itemId = nextItemId[msg.sender]++;
        
        restaurantMenus[msg.sender].push(MenuItem({
            itemId: itemId,
            name: _name,
            price: _price,
            category: _category,
            isAvailable: true
        }));
        
        emit MenuItemAdded(msg.sender, itemId, _name, _price);
    }
    
    function updateMenuItemAvailability(uint256 _itemId, bool _available) 
        external 
        restaurantExists(msg.sender) 
    {
        MenuItem[] storage menu = restaurantMenus[msg.sender];
        bool found = false;
        
        for (uint256 i = 0; i < menu.length; i++) {
            if (menu[i].itemId == _itemId) {
                menu[i].isAvailable = _available;
                found = true;
                break;
            }
        }
        
        if (!found) revert MenuItemNotFound();
    }
    
    function updateRestaurantStats(address _restaurant, bool _completed) 
        external 
        onlyOwner 
        restaurantExists(_restaurant) 
    {
        Restaurant storage restaurant = restaurants[_restaurant];
        restaurant.totalOrders++;
        
        if (_completed) {
            restaurant.completedOrders++;
        }
    }
    
    function rateRestaurant(address _restaurant, uint8 _rating) 
        external 
        onlyOwner 
        restaurantExists(_restaurant) 
    {
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        
        Restaurant storage restaurant = restaurants[_restaurant];
        
        uint256 totalPoints = (restaurant.averageRating * restaurant.totalRatings) + (_rating * 100);
        restaurant.totalRatings++;
        restaurant.averageRating = totalPoints / restaurant.totalRatings;
    }
    
    function suspendRestaurant(address _restaurant) 
        external 
        onlyVerifier 
        restaurantExists(_restaurant) 
    {
        restaurants[_restaurant].status = RestaurantStatus.Suspended;
        restaurants[_restaurant].isOpen = false;
        
        emit RestaurantVerified(_restaurant, RestaurantStatus.Suspended);
    }
    
    function getRestaurant(address _restaurant) external view returns (Restaurant memory) {
        return restaurants[_restaurant];
    }
    
    function getMenu(address _restaurant) external view returns (MenuItem[] memory) {
        return restaurantMenus[_restaurant];
    }
    
    function isRestaurantActive(address _restaurant) external view returns (bool) {
        return restaurants[_restaurant].status == RestaurantStatus.Active && 
               restaurants[_restaurant].isOpen;
    }
    
    function getActiveRestaurantsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < activeRestaurants.length; i++) {
            if (restaurants[activeRestaurants[i]].isOpen) {
                count++;
            }
        }
        return count;
    }
    
    function withdrawFees() external onlyOwner nonReentrant {
        payable(owner()).transfer(address(this).balance);
    }
}