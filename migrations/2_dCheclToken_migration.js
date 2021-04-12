const dCheckToken = artifacts.require("dCheckToken");

module.exports = function (deployer) {
  deployer.deploy(dCheckToken);
};
