# ForkNet - Decentralized Food Delivery System

A comprehensive blockchain-based food delivery platform built on Hedera Hashgraph, featuring secure payments, reputation management, and delivery verification through NFT proofs.

## Features

- **Decentralized User Management** - Customer, restaurant, and driver registration
- **Secure Payment Escrow** - HBAR-based payments with delivery code verification
- **Reputation System** - Multi-party reviews and ratings
- **NFT Delivery Proofs** - Soulbound tokens for delivery verification
- **Driver Registry** - Staking-based driver verification and management
- **Restaurant Hub** - Menu management and restaurant verification
- **Order Management** - Complete order lifecycle tracking

## Smart Contract Architecture

### Core Contracts

#### 1. UserAccountManager
**Location:** `ForkNetHbarSystem.sol`
- Manages user registration for customers, restaurants, and drivers
- Handles HBAR balance management
- User verification system
- Platform fee management (2.5% default)

#### 2. EnhancedPaymentEscrow
**Location:** `ForkNetHbarSystem.sol`
- Secure escrow system with delivery code verification
- Automatic payment release upon successful delivery
- Refund mechanism for cancelled orders
- Platform fee collection

#### 3. EnhancedOrderManager
**Location:** `ForkNetHbarSystem.sol`
- Complete order lifecycle management
- Driver assignment and delivery tracking
- Integration with payment escrow and delivery codes
- Order status updates and notifications

#### 4. DriverRegistry
**Location:** `DriverRegistry.sol`
- Driver registration with staking requirements
- Vehicle type management (Bicycle, Motorcycle, Car, Van)
- Driver verification and status management
- Availability tracking and statistics

#### 5. RestaurantHub
**Location:** `RestaurantHub.sol`
- Restaurant registration and verification
- Menu management system
- Cuisine type categorization
- Restaurant status and availability tracking

#### 6. ReputationSystem
**Location:** `ReputationSystem.sol`
- Multi-party review system
- Rating aggregation and average calculation
- Review validation and duplicate prevention
- Reputation tracking for all participants

#### 7. DeliveryProof NFT
**Location:** `DeliveryProof.sol`
- Soulbound NFT tokens for delivery verification
- IPFS-based proof storage
- Customer confirmation system
- Transfer-restricted (soulbound) tokens

## Quick Start

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Installation

```bash
# Clone the repository
git clone Repo
cd Repo

# Install dependencies
npm install

# Install Hardhat and required plugins
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Hedera Testnet Configuration
RPC_URL=https://testnet.hashio.io/api
OPERATOR_KEY=your_private_key_here

# Optional: Mainnet Configuration
MAINNET_RPC_URL=https://mainnet.hashio.io/api
MAINNET_PRIVATE_KEY=your_mainnet_private_key

# Optional: Contract Verification
ETHERSCAN_API_KEY=your_api_key_here
```

### Compilation

```bash
# Compile all contracts
npx hardhat compile
```

### Testing

```bash
# Run all tests
npx hardhat test

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/ForkNetSystem.test.js
```

### Deployment

```bash
# Deploy to Hedera testnet
npx hardhat run scripts/deploy.js --network testnet

# Deploy to mainnet (when ready)
npx hardhat run scripts/deploy.js --network mainnet
```

## Contract Specifications

### Gas Limits & Fees

| Contract | Deployment Gas | Typical Function Gas |
|----------|---------------|---------------------|
| UserAccountManager | ~2,500,000 | 100,000 - 200,000 |
| EnhancedPaymentEscrow | ~3,000,000 | 150,000 - 300,000 |
| EnhancedOrderManager | ~3,500,000 | 200,000 - 400,000 |
| DriverRegistry | ~2,800,000 | 100,000 - 250,000 |
| RestaurantHub | ~2,600,000 | 100,000 - 200,000 |
| ReputationSystem | ~2,200,000 | 80,000 - 150,000 |
| DeliveryProof | ~2,400,000 | 120,000 - 200,000 |

### Platform Fees

- **Registration Fee (Drivers):** 0.001 HBAR
- **Registration Fee (Restaurants):** 0.005 HBAR
- **Minimum Staking (Drivers):** 0.01 HBAR
- **Minimum Staking (Restaurants):** 0.05 HBAR
- **Platform Fee:** 2.5% of order total
- **Base Delivery Fee:** 0.01 HBAR

## Configuration

### Setting Up Contract Permissions

After deployment, configure the following permissions:

```javascript
// Set OrderManager as authorized caller for PaymentEscrow
await paymentEscrow.setAuthorizedCaller(orderManagerAddress, true);

// Set OrderManager as authorized caller for ReputationSystem
await reputationSystem.setAuthorizedCaller(orderManagerAddress, true);

// Set OrderManager as authorized minter for DeliveryProof
await deliveryProof.setAuthorizedMinter(orderManagerAddress, true);
```

### Updating Configuration

```solidity
// Update platform fee (only owner)
await userAccountManager.setPlatformFeePercentage(300); // 3.0%

// Update base delivery fee (only owner)
await orderManager.setBaseDeliveryFee(ethers.parseEther("0.015"));

// Update minimum staking amounts
await driverRegistry.setMinStakingAmount(ethers.parseEther("0.02"));
await restaurantHub.setMinStakingAmount(ethers.parseEther("0.1"));
```

## Usage Examples

### User Registration

```javascript
// Register as customer
await userAccountManager.registerUser(0, "John Doe", { value: ethers.parseEther("1.0") });

// Register as restaurant
await userAccountManager.registerUser(1, "Pizza Palace", { value: ethers.parseEther("5.0") });

// Register as driver
await userAccountManager.registerUser(2, "Jane Driver", { value: ethers.parseEther("2.0") });
```

### Driver Registration

```javascript
// Register driver with staking
await driverRegistry.registerDriver(
  "John Driver",
  1, // Motorcycle
  { value: ethers.parseEther("0.011") } // 0.001 fee + 0.01 staking
);
```

### Restaurant Registration

```javascript
// Register restaurant
await restaurantHub.registerRestaurant(
  "Pizza Palace",
  2, // Italian cuisine
  { value: ethers.parseEther("0.055") } // 0.005 fee + 0.05 staking
);

// Add menu item
await restaurantHub.addMenuItem(
  "Margherita Pizza",
  ethers.parseEther("0.25"), // 0.25 HBAR
  "Pizza"
);
```

### Order Flow

```javascript
// Create order
const [orderId] = await orderManager.createOrder(
  restaurantAddress,
  ethers.parseEther("0.25") // food amount
);

// Assign driver (by restaurant)
await orderManager.assignDriver(orderId, driverAddress);

// Update order status
await orderManager.updateOrderStatus(orderId, 3); // Ready for pickup

// Confirm delivery with code
await orderManager.confirmDeliveryWithCode(orderId, 123456);
```

## Testing

### Test Categories

1. **Unit Tests** - Individual contract functionality
2. **Integration Tests** - Cross-contract interactions
3. **End-to-End Tests** - Complete user journeys
4. **Gas Optimization Tests** - Performance analysis

### Running Specific Test Suites

```bash
# Test user management
npx hardhat test test/UserAccountManager.test.js

# Test payment system
npx hardhat test test/PaymentEscrow.test.js

# Test delivery system
npx hardhat test test/OrderManager.test.js

# Test reputation system
npx hardhat test test/ReputationSystem.test.js
```

## Security Features

### Access Control
- **Owner-only functions** for critical operations
- **Role-based permissions** for different user types
- **Authorized caller patterns** for cross-contract communication

### Financial Security
- **ReentrancyGuard** on all payable functions
- **Balance checks** before transfers
- **Escrow system** for secure payments
- **Staking requirements** for platform participants

### Data Integrity
- **Hash verification** for delivery codes
- **Duplicate prevention** for reviews and proofs
- **Immutable order records** for audit trails

## Monitoring & Analytics

### Events to Monitor

```solidity
// User Management
event UserRegistered(address indexed user, UserType userType, string name);
event UserVerified(address indexed user);

// Order Management
event OrderCreated(uint256 indexed orderId, address customer, address restaurant);
event DriverAssigned(uint256 indexed orderId, address driver);
event OrderCompleted(uint256 indexed orderId);

// Financial
event PaymentReleased(uint256 indexed orderId, uint256 restaurantAmount, uint256 driverAmount);
event PaymentRefunded(uint256 indexed orderId, uint256 amount);

// Reputation
event ReviewSubmitted(uint256 indexed reviewId, uint256 indexed orderId, address reviewer, address reviewed, uint8 rating);
```

### Key Metrics to Track

- Total active users by type
- Order completion rates
- Average delivery times
- Platform revenue
- User satisfaction scores
- Gas usage optimization

## Troubleshooting

### Common Issues

**Deployment Fails:**
- Check HBAR balance in deployer account
- Verify RPC URL is correct
- Ensure private key format is correct (0x prefix)

**Transaction Reverts:**
- Check user is registered and verified
- Verify sufficient HBAR balance
- Ensure proper contract permissions

**Gas Estimation Errors:**
- Update gas limits in hardhat.config.js
- Check for infinite loops or high computation functions

### Debug Commands

```bash
# Check network connection
npx hardhat console --network testnet

# Verify contract deployment
npx hardhat verify --network testnet CONTRACT_ADDRESS

# Run deployment with verbose logging
DEBUG=* npx hardhat run scripts/deploy.js --network testnet
```