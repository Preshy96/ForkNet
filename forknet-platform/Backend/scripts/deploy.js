const { ethers } = require("hardhat");

async function main() {
  // Get the signer of the tx and address for deployment
  const [deployer] = await ethers.getSigners();
  console.log("Deploying ForkNet contracts with the account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "HBAR");

  // Deploy contracts in order of dependencies
  console.log("\n=== Starting ForkNet System Deployment ===\n");

  // 1. Deploy UserAccountManager first (no dependencies)
  console.log("1. Deploying UserAccountManager...");
  const UserAccountManager = await ethers.getContractFactory("UserAccountManager");
  const userAccountManager = await UserAccountManager.deploy(deployer.address);
  await userAccountManager.waitForDeployment();
  console.log("✓ UserAccountManager deployed at:", await userAccountManager.getAddress());

  // 2. Deploy EnhancedPaymentEscrow (depends on UserAccountManager)
  console.log("\n2. Deploying EnhancedPaymentEscrow...");
  const EnhancedPaymentEscrow = await ethers.getContractFactory("EnhancedPaymentEscrow");
  const paymentEscrow = await EnhancedPaymentEscrow.deploy(
    deployer.address,
    await userAccountManager.getAddress()
  );
  await paymentEscrow.waitForDeployment();
  console.log("✓ EnhancedPaymentEscrow deployed at:", await paymentEscrow.getAddress());

  // 3. Deploy EnhancedOrderManager (depends on UserAccountManager and EnhancedPaymentEscrow)
  console.log("\n3. Deploying EnhancedOrderManager...");
  const EnhancedOrderManager = await ethers.getContractFactory("EnhancedOrderManager");
  const orderManager = await EnhancedOrderManager.deploy(
    deployer.address,
    await userAccountManager.getAddress(),
    await paymentEscrow.getAddress()
  );
  await orderManager.waitForDeployment();
  console.log("✓ EnhancedOrderManager deployed at:", await orderManager.getAddress());

  // 4. Deploy DriverRegistry (independent)
  console.log("\n4. Deploying DriverRegistry...");
  const DriverRegistry = await ethers.getContractFactory("DriverRegistry");
  const driverRegistry = await DriverRegistry.deploy(deployer.address);
  await driverRegistry.waitForDeployment();
  console.log("✓ DriverRegistry deployed at:", await driverRegistry.getAddress());

  // 5. Deploy RestaurantHub (independent)
  console.log("\n5. Deploying RestaurantHub...");
  const RestaurantHub = await ethers.getContractFactory("RestaurantHub");
  const restaurantHub = await RestaurantHub.deploy(deployer.address);
  await restaurantHub.waitForDeployment();
  console.log("✓ RestaurantHub deployed at:", await restaurantHub.getAddress());

  // 6. Deploy ReputationSystem (independent)
  console.log("\n6. Deploying ReputationSystem...");
  const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
  const reputationSystem = await ReputationSystem.deploy(deployer.address);
  await reputationSystem.waitForDeployment();
  console.log("✓ ReputationSystem deployed at:", await reputationSystem.getAddress());

  // 7. Deploy DeliveryProof NFT (independent)
  console.log("\n7. Deploying DeliveryProof NFT...");
  const baseTokenURI = "https://api.forknet.io/metadata/"; // Update with your metadata URI
  const DeliveryProof = await ethers.getContractFactory("DeliveryProof");
  const deliveryProof = await DeliveryProof.deploy(deployer.address, baseTokenURI);
  await deliveryProof.waitForDeployment();
  console.log("✓ DeliveryProof deployed at:", await deliveryProof.getAddress());

  // Configure contract permissions
  console.log("\n=== Configuring Contract Permissions ===\n");

  // Set authorized callers for PaymentEscrow
  console.log("Setting OrderManager as authorized caller for PaymentEscrow...");
  await paymentEscrow.setAuthorizedCaller(await orderManager.getAddress(), true);
  console.log("✓ PaymentEscrow permissions configured");

  // Set authorized callers for ReputationSystem
  console.log("Setting OrderManager as authorized caller for ReputationSystem...");
  await reputationSystem.setAuthorizedCaller(await orderManager.getAddress(), true);
  console.log("✓ ReputationSystem permissions configured");

  // Set authorized minter for DeliveryProof
  console.log("Setting OrderManager as authorized minter for DeliveryProof...");
  await deliveryProof.setAuthorizedMinter(await orderManager.getAddress(), true);
  console.log("✓ DeliveryProof permissions configured");

  // Final deployment summary
  console.log("\n=== ForkNet Deployment Complete ===\n");
  console.log(" Contract Addresses:");
  console.log("├── UserAccountManager:    ", await userAccountManager.getAddress());
  console.log("├── EnhancedPaymentEscrow: ", await paymentEscrow.getAddress());
  console.log("├── EnhancedOrderManager:  ", await orderManager.getAddress());
  console.log("├── DriverRegistry:        ", await driverRegistry.getAddress());
  console.log("├── RestaurantHub:         ", await restaurantHub.getAddress());
  console.log("├── ReputationSystem:      ", await reputationSystem.getAddress());
  console.log("└── DeliveryProof NFT:     ", await deliveryProof.getAddress());

  // Save deployment addresses to file
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      UserAccountManager: await userAccountManager.getAddress(),
      EnhancedPaymentEscrow: await paymentEscrow.getAddress(),
      EnhancedOrderManager: await orderManager.getAddress(),
      DriverRegistry: await driverRegistry.getAddress(),
      RestaurantHub: await restaurantHub.getAddress(),
      ReputationSystem: await reputationSystem.getAddress(),
      DeliveryProof: await deliveryProof.getAddress()
    }
  };

  const fs = require('fs');
  const path = require('path');
  const deploymentFile = path.join(__dirname, '..', 'deployments', `${hre.network.name}.json`);
  
  // Create deployments directory if it doesn't exist
  const deploymentDir = path.dirname(deploymentFile);
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n Deployment info saved to: ${deploymentFile}`);

  console.log("\n ForkNet system deployment successful!");
  console.log("\n Next steps:");
  console.log("1. Verify contracts on explorer if needed");
  console.log("2. Update frontend with new contract addresses");
  console.log("3. Test core functionality:");
  console.log("   - User registration");
  console.log("   - Restaurant/driver registration");
  console.log("   - Order creation and delivery flow");
  console.log("4. Configure metadata URI for DeliveryProof NFTs");
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });