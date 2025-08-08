require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      // HashIO RPC testnet endpoint in the .env file
      url: process.env.RPC_URL,
      // Your ECDSA account private key pulled from the .env file
      accounts: [process.env.OPERATOR_KEY],
      gas: 3000000,
      gasPrice: 10000000000, // 10 gwei
    },
    ...(process.env.MAINNET_RPC_URL && {
      mainnet: {
        url: process.env.MAINNET_RPC_URL,
        accounts: process.env.MAINNET_PRIVATE_KEY ? [process.env.MAINNET_PRIVATE_KEY] : [],
        gas: 3000000,
        gasPrice: 10000000000,
      }
    })
  },
  etherscan: {
    apiKey: {
      // Add your API key for contract verification if needed
      testnet: process.env.ETHERSCAN_API_KEY || ""
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};