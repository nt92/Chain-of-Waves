require("@nomiclabs/hardhat-waffle");

const { privateKey, alchemyKey } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: alchemyKey,
      accounts: [privateKey],
    },
  },
};
