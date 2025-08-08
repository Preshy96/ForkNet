// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// ReputationSystem.sol

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ReputationSystem is Ownable, ReentrancyGuard {
    
    enum ReviewType { CustomerToRestaurant, CustomerToDriver, RestaurantToDriver, DriverToCustomer }
    
    struct Review {
        uint256 reviewId;
        uint256 orderId;
        address reviewer;
        address reviewed;
        ReviewType reviewType;
        uint8 rating; // 1-5
        string comment;
        uint256 timestamp;
        bool isActive;
    }
    
    mapping(uint256 => Review) public reviews;
    mapping(address => uint256) public userAverageRating; // Scaled by 100
    mapping(address => uint256) public userTotalRatings;
    mapping(uint256 => bool) public orderReviewed; // Prevent duplicate reviews
    mapping(address => bool) public authorizedCallers;
    
    uint256 public nextReviewId = 1;
    uint256 public minReviewLength = 10;
    uint256 public maxReviewLength = 500;
    
    event ReviewSubmitted(uint256 indexed reviewId, uint256 indexed orderId, address reviewer, address reviewed, uint8 rating);
    event UserRatingUpdated(address indexed user, uint256 newRating, uint256 totalRatings);
    
    error UnauthorizedCaller();
    error InvalidRating();
    error ReviewTooShort();
    error ReviewTooLong();
    error OrderAlreadyReviewed();
    error SelfReviewNotAllowed();
    
    modifier onlyAuthorized() {
        if (!authorizedCallers[msg.sender] && msg.sender != owner()) revert UnauthorizedCaller();
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        authorizedCallers[initialOwner] = true;
    }
    
    function setAuthorizedCaller(address _caller, bool _authorized) external onlyOwner {
        authorizedCallers[_caller] = _authorized;
    }
    
    function submitReview(
        uint256 _orderId,
        address _reviewer,
        address _reviewed,
        uint8 _rating,
        string calldata _comment,
        ReviewType _reviewType
    ) external onlyAuthorized nonReentrant {
        if (_reviewer == _reviewed) revert SelfReviewNotAllowed();
        if (_rating < 1 || _rating > 5) revert InvalidRating();
        if (bytes(_comment).length < minReviewLength) revert ReviewTooShort();
        if (bytes(_comment).length > maxReviewLength) revert ReviewTooLong();
        
        bytes32 reviewHash = keccak256(abi.encodePacked(_orderId, _reviewer, _reviewed, _reviewType));
        if (orderReviewed[uint256(reviewHash)]) revert OrderAlreadyReviewed();
        
        uint256 reviewId = nextReviewId++;
        
        reviews[reviewId] = Review({
            reviewId: reviewId,
            orderId: _orderId,
            reviewer: _reviewer,
            reviewed: _reviewed,
            reviewType: _reviewType,
            rating: _rating,
            comment: _comment,
            timestamp: block.timestamp,
            isActive: true
        });
        
        orderReviewed[uint256(reviewHash)] = true;
        
        // Update user rating
        _updateUserRating(_reviewed, _rating);
        
        emit ReviewSubmitted(reviewId, _orderId, _reviewer, _reviewed, _rating);
    }
    
    function _updateUserRating(address _user, uint8 _rating) internal {
        uint256 currentAvg = userAverageRating[_user];
        uint256 currentTotal = userTotalRatings[_user];
        
        uint256 totalPoints = (currentAvg * currentTotal) + (_rating * 100);
        userTotalRatings[_user] = currentTotal + 1;
        userAverageRating[_user] = totalPoints / userTotalRatings[_user];
        
        emit UserRatingUpdated(_user, userAverageRating[_user], userTotalRatings[_user]);
    }
    
    function getReview(uint256 _reviewId) external view returns (Review memory) {
        return reviews[_reviewId];
    }
    
    function getUserRating(address _user) external view returns (uint256 averageRating, uint256 totalRatings) {
        return (userAverageRating[_user], userTotalRatings[_user]);
    }
    
    function setReviewLimits(uint256 _minLength, uint256 _maxLength) external onlyOwner {
        require(_maxLength > _minLength, "Invalid lengths");
        minReviewLength = _minLength;
        maxReviewLength = _maxLength;
    }
}