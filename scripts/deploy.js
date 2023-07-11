
const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.deployContract("chai"); //fetching bytecode and ABI
  const chai = await Chai.waitForDeployment(); //creating an instance of our smart contract

  await chai.deployed();//deploying your smart contract

  const address = await chai.getAddress();
  console.log(`Contract Address: ${address}`);}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.log('chenenen')
  console.error(error);
  process.exitCode = 1;
});
//0xa64e3144835aF8781c750ceC432784a68d883266