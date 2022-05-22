import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC721Safe Contact", function () {
  let addr0: SignerWithAddress;
  let multicall: Contract;
  let proxy: Contract;
  let nft: Contract;
  
  beforeEach(async () => {
    [addr0] = await ethers.getSigners();
    const Multicall = await ethers.getContractFactory("Multicall");
    multicall = await Multicall.deploy();
    await multicall.deployed()

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();

    const ERC721Safe = await ethers.getContractFactory("ERC721Safe");
    proxy = await ERC721Safe.deploy(nft.address);
    await proxy.deployed();
    
    await nft.mint()
  });

  describe("Accessing contract externally", function () {
    it("Should bew accessible with multicall", async function () {
      const multicallData = [
        { target: proxy.address,
          callData: await nft.interface.encodeFunctionData("ownerOf", [0])
        },
        { target: proxy.address,
          callData: await nft.interface.encodeFunctionData("ownerOf", [9999])
        },
      ]
      const result = await multicall.callStatic.aggregate(multicallData);
      
      expect(result.returnData[1]).to.equal(ethers.constants.HashZero);
    });
  });

  describe("OwnerOf", function () {
    it("Should return owner address of existing nft's", async function () {
      expect(await proxy.ownerOf(0)).to.equal(addr0.address);
    });

    it("Should return 0x0 for non-existing nft's", async function () {
      expect(await proxy.ownerOf(9999)).to.equal(ethers.constants.AddressZero);
    });
  });
});
