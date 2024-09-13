// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24; //this is the version of the solidity we are using in this contract.

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol"; //this is given to us by hardhat to debug our code. It is very helpful in local environment.

contract BrianNFT is ERC721URIStorage {

    //Counters.Counter private _tokenIds -- replaced with below
    uint private _tokenIds;

     constructor() ERC721("BrianNjoroge", "BRIAN") {}

    function mintNFT() public returns (uint256) {
        // _tokenIds.increment() -- replaced with below
        _tokenIds++;
        //uint256 newItemId = _tokenIds.current(); -- replaced with below
        uint newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://magenta-faithful-bird-777.mypinata.cloud/ipfs/QmQ3EFsTpV3XTjLbVnz89FEF3wTmhaEirgBjMuE9i3mTZB");
        console.log(
            "The NFT ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        return newItemId;
    }
}