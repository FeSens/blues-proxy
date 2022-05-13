// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BluesAggregator = await ethers.getContractFactory("BluesAggregator");
  const bluesAggregator = await BluesAggregator.deploy("0xb0dAdB9dCc2A3ABDf7fd814A99427B0731A01e57", "0xCDf025570C270146507Fe6eE9F96574dca43fbDe");

  const transaction = await bluesAggregator.deployed();

  console.log("Transaction:", transaction);
  console.log("BluesAggregator deployed to:", bluesAggregator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
