// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	constructor() ERC721("MyNFT", "MNFT") {}

	function mint() external returns (uint256) {
		_mint(msg.sender, _tokenIds.current());
		_tokenIds.increment();
		return 2131; //_tokenIds.current();
	}
}
