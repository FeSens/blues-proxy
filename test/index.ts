import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC721Safe", function () {
  it("Should bew accessible with multicall", async function () {
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed()
    
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.deployed();
    console.log(nft.address);

    const ERC721Safe = await ethers.getContractFactory("ERC721Safe");
    const proxy = await ERC721Safe.deploy(nft.address);
    await proxy.deployed();
    
    await nft.mint()

    const multicallData = await nft.interface.encodeFunctionData("ownerOf", [9999]);
    const result = await multicall.aggregate([{target: proxy.address, callData: multicallData}]);
    console.log(result.data);
  });
});
