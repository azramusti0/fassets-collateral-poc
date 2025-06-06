require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.23",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/WodLagKoUdbF8NEBApUmD",
        blockNumber: 19500000
      }
    }
  }
};
