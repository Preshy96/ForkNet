// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// DriverRegistry.sol

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DriverRegistry is Ownable, ReentrancyGuard {
    
    enum DriverStatus { Pending, Active, Suspended, Banned }
    enum VehicleType { Bicycle, Motorcycle, Car, Van }
    
    struct Driver {
        address driverAddress;
        string name;
        VehicleType vehicleType;
        DriverStatus status;
        uint256 totalDeliveries;
        uint256 completedDeliveries;
        uint256 averageRating; // Scaled by 100
        uint256 totalRatings;
        uint256 stakingAmount;
        uint256 registeredAt;
        bool isAvailable;
    }
    
    mapping(address => Driver) public drivers;
    mapping(address => bool) public verifiers;
    address[] public activeDrivers;
    mapping(address => uint256) public activeDriverIndex;
    
    uint256 public minStakingAmount = 0.01 ether;
    uint256 public registrationFee = 0.001 ether;
    uint256 public totalRegisteredDrivers;
    
    event DriverRegistered(address indexed driver, string name, VehicleType vehicleType);
    event DriverVerified(address indexed driver, DriverStatus status);
    event DriverRated(address indexed driver, uint8 rating);
    event DriverAvailabilityChanged(address indexed driver, bool available);
    
    error InsufficientStaking();
    error DriverNotFound();
    error UnauthorizedVerifier();
    error InvalidRating();
    
    modifier driverExists(address _driver) {
        if (drivers[_driver].driverAddress == address(0)) revert DriverNotFound();
        _;
    }
    
    modifier onlyVerifier() {
        if (!verifiers[msg.sender] && msg.sender != owner()) revert UnauthorizedVerifier();
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        verifiers[initialOwner] = true;
    }
    
    function setVerifier(address _verifier, bool _status) external onlyOwner {
        verifiers[_verifier] = _status;
    }
    
    function registerDriver(
        string calldata _name,
        VehicleType _vehicleType
    ) external payable nonReentrant {
        require(msg.value >= registrationFee + minStakingAmount, "Insufficient payment");
        require(drivers[msg.sender].driverAddress == address(0), "Already registered");
        
        uint256 stakingAmount = msg.value - registrationFee;
        
        drivers[msg.sender] = Driver({
            driverAddress: msg.sender,
            name: _name,
            vehicleType: _vehicleType,
            status: DriverStatus.Pending,
            totalDeliveries: 0,
            completedDeliveries: 0,
            averageRating: 500, // Start at 5.0
            totalRatings: 0,
            stakingAmount: stakingAmount,
            registeredAt: block.timestamp,
            isAvailable: false
        });
        
        totalRegisteredDrivers++;
        
        emit DriverRegistered(msg.sender, _name, _vehicleType);
    }
    
    function verifyDriver(address _driver, DriverStatus _status) 
        external 
        onlyVerifier 
        driverExists(_driver) 
    {
        Driver storage driver = drivers[_driver];
        require(driver.status == DriverStatus.Pending, "Already processed");
        
        driver.status = _status;
        
        if (_status == DriverStatus.Active) {
            activeDrivers.push(_driver);
            activeDriverIndex[_driver] = activeDrivers.length - 1;
        } else if (_status == DriverStatus.Banned) {
            // Refund staking
            payable(_driver).transfer(driver.stakingAmount);
            driver.stakingAmount = 0;
        }
        
        emit DriverVerified(_driver, _status);
    }
    
    function setAvailability(bool _available) external driverExists(msg.sender) {
        Driver storage driver = drivers[msg.sender];
        require(driver.status == DriverStatus.Active, "Not active driver");
        
        driver.isAvailable = _available;
        
        emit DriverAvailabilityChanged(msg.sender, _available);
    }
    
    function updateDriverStats(address _driver, bool _completed) 
        external 
        onlyOwner 
        driverExists(_driver) 
    {
        Driver storage driver = drivers[_driver];
        driver.totalDeliveries++;
        
        if (_completed) {
            driver.completedDeliveries++;
        }
    }
    
    function rateDriver(address _driver, uint8 _rating) 
        external 
        onlyOwner 
        driverExists(_driver) 
    {
        if (_rating < 1 || _rating > 5) revert InvalidRating();
        
        Driver storage driver = drivers[_driver];
        
        uint256 totalPoints = (driver.averageRating * driver.totalRatings) + (_rating * 100);
        driver.totalRatings++;
        driver.averageRating = totalPoints / driver.totalRatings;
        
        emit DriverRated(_driver, _rating);
    }
    
    function suspendDriver(address _driver) external onlyVerifier driverExists(_driver) {
        drivers[_driver].status = DriverStatus.Suspended;
        drivers[_driver].isAvailable = false;
        _removeFromActiveDrivers(_driver);
        
        emit DriverVerified(_driver, DriverStatus.Suspended);
    }
    
    function _removeFromActiveDrivers(address _driver) internal {
        uint256 index = activeDriverIndex[_driver];
        uint256 lastIndex = activeDrivers.length - 1;
        
        if (index != lastIndex) {
            address lastDriver = activeDrivers[lastIndex];
            activeDrivers[index] = lastDriver;
            activeDriverIndex[lastDriver] = index;
        }
        
        activeDrivers.pop();
        delete activeDriverIndex[_driver];
    }
    
    function getDriver(address _driver) external view returns (Driver memory) {
        return drivers[_driver];
    }
    
    function getAvailableDriversCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < activeDrivers.length; i++) {
            if (drivers[activeDrivers[i]].isAvailable) {
                count++;
            }
        }
        return count;
    }
    
    function isDriverAvailable(address _driver) external view returns (bool) {
        return drivers[_driver].status == DriverStatus.Active && drivers[_driver].isAvailable;
    }
    
    function withdrawFees() external onlyOwner nonReentrant {
        payable(owner()).transfer(address(this).balance);
    }
}