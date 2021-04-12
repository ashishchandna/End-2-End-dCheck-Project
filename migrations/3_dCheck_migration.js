const dCheckToken = artifacts.require("dCheckToken");

const dcheck = artifacts.require("dcheck");

module.exports = async function (deployer) {

  var token  = await dCheckToken.deployed();

  await deployer.deploy(dcheck, token.address);


  await token.approve(dcheck.address, web3.utils.toWei('100','ether'), {from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"});
  await token.approve(dcheck.address, web3.utils.toWei('100','ether'), {from: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"});
  await token.approve(dcheck.address, web3.utils.toWei('100','ether'), {from: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"});
  
};