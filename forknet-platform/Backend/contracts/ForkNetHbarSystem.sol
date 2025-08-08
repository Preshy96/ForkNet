// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// ForkNetHbarSystem.sol

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

// User Account Management Contract
contract UserAccountManager is Ownable, ReentrancyGuard {
    
    enum UserType { Customer, Restaurant, Driver }
    
    struct UserAccount {
        address walletAddress;
        UserType userType;
        uint256 hbarBalance;
        bool isActive;
        uint256 registeredAt;
        string name;
        bool isVerified;
    }
    
    mapping(address => UserAccount) public accounts;
    mapping(address => bool) public registeredUsers;
    
    uint256 public totalUsers;
    uint256 public platformFeePercentage = 250; // 2.5%
    
    event UserRegistered(address indexed user, UserType userType, string name);
    event HbarDeposited(address indexed user, uint256 amount);
    event HbarWithdrawn(address indexed user, uint256 amount);
    event UserVerified(address indexed user);
    
    error UserAlreadyRegistered();
    error UserNotFound();
    error InsufficientBalance();
    error InvalidUserType();
    
    modifier userExists(address _user) {
        if (!registeredUsers[_user]) revert UserNotFound();
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    function registerUser(
        UserType _userType,
        string calldata _name
    ) external payable nonReentrant {
        if (registeredUsers[msg.sender]) revert UserAlreadyRegistered();
        
        accounts[msg.sender] = UserAccount({
            walletAddress: msg.sender,
            userType: _userType,
            hbarBalance: msg.value,
            isActive: true,
            registeredAt: block.timestamp,
            name: _name,
            isVerified: false
        });
        
        registeredUsers[msg.sender] = true;
        totalUsers++;
        
        emit UserRegistered(msg.sender, _userType, _name);
        
        if (msg.value > 0) {
            emit HbarDeposited(msg.sender, msg.value);
        }
    }
    
    function depositHbar() external payable userExists(msg.sender) {
        accounts[msg.sender].hbarBalance += msg.value;
        emit HbarDeposited(msg.sender, msg.value);
    }
    
    function withdrawHbar(uint256 _amount) external userExists(msg.sender) nonReentrant {
        UserAccount storage account = accounts[msg.sender];
        if (account.hbarBalance < _amount) revert InsufficientBalance();
        
        account.hbarBalance -= _amount;
        
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed");
        
        emit HbarWithdrawn(msg.sender, _amount);
    }
    
    function verifyUser(address _user) external onlyOwner userExists(_user) {
        accounts[_user].isVerified = true;
        emit UserVerified(_user);
    }
    
    function getAccountBalance(address _user) external view returns (uint256) {
        return accounts[_user].hbarBalance;
    }
    
    function getUserAccount(address _user) external view returns (UserAccount memory) {
        return accounts[_user];
    }
    
    function deductBalance(address _user, uint256 _amount) external onlyOwner userExists(_user) {
        UserAccount storage account = accounts[_user];
        if (account.hbarBalance < _amount) revert InsufficientBalance();
        account.hbarBalance -= _amount;
    }
    
    function addBalance(address _user, uint256 _amount) external onlyOwner userExists(_user) {
        accounts[_user].hbarBalance += _amount;
    }
}

// Enhanced Payment Escrow with Delivery Code System
contract EnhancedPaymentEscrow is Ownable, ReentrancyGuard {
    
    enum EscrowStatus { Created, Released, Refunded, Completed }
    
    struct Escrow {
        uint256 orderId;
        address customer;
        address restaurant;
        address driver;
        uint256 totalAmount;
        uint256 foodAmount;
        uint256 deliveryAmount;
        uint256 platformFee;
        EscrowStatus status;
        uint256 createdAt;
        bytes32 deliveryCodeHash; // Hash of the delivery confirmation code
        bool codeVerified;
    }
    
    mapping(uint256 => Escrow) public escrows;
    mapping(address => bool) public authorizedCallers;
    mapping(bytes32 => uint256) public codeToOrderId; // Maps code hash to order ID
    
    UserAccountManager public accountManager;
    uint256 public platformFeePercentage = 250; // 2.5%
    uint256 public totalPlatformFees;
    
    event EscrowCreated(uint256 indexed orderId, uint256 totalAmount, uint256 foodAmount, uint256 deliveryAmount);
    event DeliveryCodeGenerated(uint256 indexed orderId, bytes32 codeHash);
    event DeliveryConfirmed(uint256 indexed orderId, address confirmedBy);
    event PaymentReleased(uint256 indexed orderId, uint256 restaurantAmount, uint256 driverAmount);
    event PaymentRefunded(uint256 indexed orderId, uint256 amount);
    
    error EscrowNotFound();
    error UnauthorizedCaller();
    error InvalidDeliveryCode();
    error EscrowAlreadyCompleted();
    error InsufficientBalance();
    
    modifier onlyAuthorized() {
        if (!authorizedCallers[msg.sender] && msg.sender != owner()) revert UnauthorizedCaller();
        _;
    }
    
    modifier escrowExists(uint256 _orderId) {
        if (escrows[_orderId].totalAmount == 0) revert EscrowNotFound();
        _;
    }
    
    constructor(address initialOwner, address _accountManager) Ownable(initialOwner) {
        authorizedCallers[initialOwner] = true;
        accountManager = UserAccountManager(_accountManager);
    }
    
    function setAuthorizedCaller(address _caller, bool _authorized) external onlyOwner {
        authorizedCallers[_caller] = _authorized;
    }
    
    function createEscrowWithCode(
        uint256 _orderId,
        address _customer,
        address _restaurant,
        address _driver,
        uint256 _foodAmount,
        uint256 _deliveryAmount
    ) external onlyAuthorized returns (bytes32) {
        require(escrows[_orderId].totalAmount == 0, "Escrow exists");
        
        uint256 totalAmount = _foodAmount + _deliveryAmount;
        uint256 platformFee = (totalAmount * platformFeePercentage) / 10000;
        
        // Check customer has sufficient balance
        if (accountManager.getAccountBalance(_customer) < totalAmount) revert InsufficientBalance();
        
        // Deduct from customer account
        accountManager.deductBalance(_customer, totalAmount);
        
        // Generate unique delivery code (6-digit number)
        uint256 randomCode = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            _orderId,
            _customer,
            _driver
        ))) % 1000000; // 6-digit code
        
        bytes32 codeHash = keccak256(abi.encodePacked(randomCode));
        
        escrows[_orderId] = Escrow({
            orderId: _orderId,
            customer: _customer,
            restaurant: _restaurant,
            driver: _driver,
            totalAmount: totalAmount,
            foodAmount: _foodAmount,
            deliveryAmount: _deliveryAmount,
            platformFee: platformFee,
            status: EscrowStatus.Created,
            createdAt: block.timestamp,
            deliveryCodeHash: codeHash,
            codeVerified: false
        });
        
        codeToOrderId[codeHash] = _orderId;
        
        emit EscrowCreated(_orderId, totalAmount, _foodAmount, _deliveryAmount);
        emit DeliveryCodeGenerated(_orderId, codeHash);
        
        return codeHash;
    }
    
    function confirmDeliveryWithCode(uint256 _orderId, uint256 _deliveryCode) 
        external 
        escrowExists(_orderId) 
        nonReentrant 
    {
        Escrow storage escrow = escrows[_orderId];
        require(escrow.status == EscrowStatus.Created, "Invalid escrow status");
        require(msg.sender == escrow.driver, "Only driver can confirm delivery");
        
        bytes32 providedCodeHash = keccak256(abi.encodePacked(_deliveryCode));
        require(providedCodeHash == escrow.deliveryCodeHash, "Invalid delivery code");
        
        escrow.codeVerified = true;
        escrow.status = EscrowStatus.Released;
        
        // Calculate amounts
        uint256 restaurantAmount = escrow.foodAmount - ((escrow.foodAmount * platformFeePercentage) / 10000);
        uint256 driverAmount = escrow.deliveryAmount - ((escrow.deliveryAmount * platformFeePercentage) / 10000);
        
        totalPlatformFees += escrow.platformFee;
        
        // Add amounts to respective accounts
        accountManager.addBalance(escrow.restaurant, restaurantAmount);
        accountManager.addBalance(escrow.driver, driverAmount);
        
        emit DeliveryConfirmed(_orderId, msg.sender);
        emit PaymentReleased(_orderId, restaurantAmount, driverAmount);
    }
    
    function refundPayment(uint256 _orderId) 
        external 
        onlyAuthorized 
        escrowExists(_orderId) 
        nonReentrant 
    {
        Escrow storage escrow = escrows[_orderId];
        require(escrow.status == EscrowStatus.Created, "Already processed");
        
        escrow.status = EscrowStatus.Refunded;
        
        // Refund to customer account
        accountManager.addBalance(escrow.customer, escrow.totalAmount);
        
        emit PaymentRefunded(_orderId, escrow.totalAmount);
    }
    
    function getDeliveryCode(uint256 _orderId) external view escrowExists(_orderId) returns (bytes32) {
        Escrow memory escrow = escrows[_orderId];
        require(msg.sender == escrow.customer, "Only customer can view delivery code");
        return escrow.deliveryCodeHash;
    }
    
    function getEscrow(uint256 _orderId) external view returns (Escrow memory) {
        return escrows[_orderId];
    }
    
    function withdrawPlatformFees() external onlyOwner nonReentrant {
        uint256 amount = totalPlatformFees;
        totalPlatformFees = 0;
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");
    }
}

// Enhanced Order Manager with Delivery Code Integration
contract EnhancedOrderManager is Ownable, ReentrancyGuard, Pausable {
    
    enum OrderStatus { Created, Confirmed, Preparing, Ready, Assigned, PickedUp, Delivered, Completed, Cancelled }
    
    struct Order {
        uint256 orderId;
        address customer;
        address restaurant;
        address driver;
        OrderStatus status;
        uint256 foodAmount;
        uint256 deliveryAmount;
        uint256 totalAmount;
        uint256 createdAt;
        uint256 completedAt;
        bytes32 deliveryCodeHash;
        bool isActive;
    }
    
    mapping(uint256 => Order) public orders;
    
    UserAccountManager public accountManager;
    EnhancedPaymentEscrow public paymentEscrow;
    
    uint256 public nextOrderId = 1;
    uint256 public baseDeliveryFee = 0.01 ether; // Base delivery fee in HBAR
    
    event OrderCreated(uint256 indexed orderId, address customer, address restaurant, uint256 foodAmount, uint256 deliveryAmount);
    event OrderStatusUpdated(uint256 indexed orderId, OrderStatus status);
    event DriverAssigned(uint256 indexed orderId, address driver);
    event DeliveryCodeShared(uint256 indexed orderId, address customer, uint256 deliveryCode);
    event OrderCompleted(uint256 indexed orderId);
    
    error OrderNotFound();
    error UnauthorizedAccess();
    error InvalidStatus();
    error UserNotVerified();
    error InsufficientBalance();
    
    modifier orderExists(uint256 _orderId) {
        if (!orders[_orderId].isActive) revert OrderNotFound();
        _;
    }
    
    modifier onlyOrderParticipant(uint256 _orderId) {
        Order storage order = orders[_orderId];
        if (msg.sender != order.customer && msg.sender != order.restaurant && 
            msg.sender != order.driver && msg.sender != owner()) {
            revert UnauthorizedAccess();
        }
        _;
    }
    
    constructor(
        address initialOwner,
        address _accountManager,
        address _paymentEscrow
    ) Ownable(initialOwner) {
        accountManager = UserAccountManager(_accountManager);
        paymentEscrow = EnhancedPaymentEscrow(_paymentEscrow);
    }
    
    function createOrder(
        address _restaurant,
        uint256 _foodAmount
    ) external nonReentrant whenNotPaused returns (uint256, bytes32) {
        // Verify user accounts
        UserAccountManager.UserAccount memory customer = accountManager.getUserAccount(msg.sender);
        UserAccountManager.UserAccount memory restaurant = accountManager.getUserAccount(_restaurant);
        
        require(customer.isVerified && restaurant.isVerified, "Users must be verified");
        require(customer.userType == UserAccountManager.UserType.Customer, "Only customers can create orders");
        require(restaurant.userType == UserAccountManager.UserType.Restaurant, "Invalid restaurant");
        
        uint256 deliveryAmount = baseDeliveryFee;
        uint256 totalAmount = _foodAmount + deliveryAmount;
        
        if (accountManager.getAccountBalance(msg.sender) < totalAmount) revert InsufficientBalance();
        
        uint256 orderId = nextOrderId++;
        
        orders[orderId] = Order({
            orderId: orderId,
            customer: msg.sender,
            restaurant: _restaurant,
            driver: address(0),
            status: OrderStatus.Created,
            foodAmount: _foodAmount,
            deliveryAmount: deliveryAmount,
            totalAmount: totalAmount,
            createdAt: block.timestamp,
            completedAt: 0,
            deliveryCodeHash: bytes32(0),
            isActive: true
        });
        
        emit OrderCreated(orderId, msg.sender, _restaurant, _foodAmount, deliveryAmount);
        
        return (orderId, bytes32(0)); // Code will be generated when driver is assigned
    }
    
    function assignDriver(uint256 _orderId, address _driver) 
        external 
        orderExists(_orderId) 
        whenNotPaused 
        returns (bytes32)
    {
        Order storage order = orders[_orderId];
        require(msg.sender == order.restaurant || msg.sender == owner(), "Unauthorized");
        
        UserAccountManager.UserAccount memory driver = accountManager.getUserAccount(_driver);
        require(driver.isVerified && driver.userType == UserAccountManager.UserType.Driver, "Invalid driver");
        
        order.driver = _driver;
        order.status = OrderStatus.Assigned;
        
        // Create escrow with delivery code
        bytes32 codeHash = paymentEscrow.createEscrowWithCode(
            _orderId,
            order.customer,
            order.restaurant,
            _driver,
            order.foodAmount,
            order.deliveryAmount
        );
        
        order.deliveryCodeHash = codeHash;
        
        emit DriverAssigned(_orderId, _driver);
        emit OrderStatusUpdated(_orderId, OrderStatus.Assigned);
        
        return codeHash;
    }
    
    function updateOrderStatus(uint256 _orderId, OrderStatus _status) 
        external 
        orderExists(_orderId) 
        onlyOrderParticipant(_orderId) 
        whenNotPaused 
    {
        Order storage order = orders[_orderId];
        
        if (_status == OrderStatus.Confirmed && msg.sender != order.restaurant) revert UnauthorizedAccess();
        if (_status == OrderStatus.PickedUp && msg.sender != order.driver) revert UnauthorizedAccess();
        
        order.status = _status;
        emit OrderStatusUpdated(_orderId, _status);
    }
    
    function shareDeliveryCode(uint256 _orderId, uint256 _deliveryCode) 
        external 
        orderExists(_orderId) 
    {
        Order storage order = orders[_orderId];
        require(msg.sender == order.customer, "Only customer can share delivery code");
        require(order.status == OrderStatus.PickedUp || order.status == OrderStatus.Delivered, "Invalid order status");
        
        emit DeliveryCodeShared(_orderId, msg.sender, _deliveryCode);
    }
    
    function confirmDeliveryWithCode(uint256 _orderId, uint256 _deliveryCode) 
        external 
        orderExists(_orderId) 
        whenNotPaused 
    {
        Order storage order = orders[_orderId];
        require(msg.sender == order.driver, "Only driver can confirm delivery");
        
        // Confirm delivery with escrow system
        paymentEscrow.confirmDeliveryWithCode(_orderId, _deliveryCode);
        
        order.status = OrderStatus.Completed;
        order.completedAt = block.timestamp;
        
        emit OrderCompleted(_orderId);
    }
    
    function cancelOrder(uint256 _orderId) 
        external 
        orderExists(_orderId) 
        onlyOrderParticipant(_orderId) 
        nonReentrant 
        whenNotPaused 
    {
        Order storage order = orders[_orderId];
        order.status = OrderStatus.Cancelled;
        
        // Refund payment if escrow was created
        if (order.deliveryCodeHash != bytes32(0)) {
            paymentEscrow.refundPayment(_orderId);
        }
        
        emit OrderStatusUpdated(_orderId, OrderStatus.Cancelled);
    }
    
    function getOrder(uint256 _orderId) external view returns (Order memory) {
        return orders[_orderId];
    }
    
    function setBaseDeliveryFee(uint256 _fee) external onlyOwner {
        baseDeliveryFee = _fee;
    }
    
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}

// Strings utility library
library Strings {
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}