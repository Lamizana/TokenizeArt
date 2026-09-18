// SPDX-License-Identifier: MIT
// Token42 - NFT non fongible (standard BEP-721 / ERC-721) sur la BNB Chain
// Nom de la collection : TokenizeArt - Symbole : T42
pragma solidity ^0.8.20;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/access/Ownable.sol";

contract Token42 is ERC721URIStorage, Ownable {
    // Compteur des tokens deja crees (les ids commencent a 1)
    uint256 private _tokenIds;

    // URI de base pointe vers les metadonnees du NFT (IPFS)
    string public baseURI;

    constructor(
        string memory _baseURI
    ) ERC721("TokenizeArt", "T42") Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    // Seul le proprietaire de la collection (onlyOwner) peut creer un NFT.
    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;
        _safeMint(recipient, newTokenId); // verifie que le destinataire accepte le NFT
        _setTokenURI(newTokenId, baseURI); // associe les metadonnees IPFS au token
        return newTokenId;
    }

    // Permet au proprietaire de mettre a jour les metadonnees (IPFS) sans
    // redeployer. Ne concerne que les tokens non encore min.
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}
