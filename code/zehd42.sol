// SPDX-License-Identifier: MIT
// Zehd42 — NFT non fongible (BEP-721 / ERC-721) sur la BNB Smart Chain
pragma solidity ^0.8.20;

// Imports OpenZeppelin v5.1.0 : ERC721 (standard), ERC721URIStorage (URI), Ownable (propriété)
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/access/Ownable.sol";

contract Zehd42 is ERC721URIStorage, Ownable {
    // Compteur des tokens créés (ids à partir de 1) :
    uint256 private _tokenIds;

    // URI de base des métadonnées (IPFS) :
    string public baseURI;

    // Constructeur : nom, symbole et URI de base :
    constructor(string memory _baseURI) ERC721("Zehd42", "Z42") Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    // Miner un NFT, réservé au propriétaire :
    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds += 1;                    // nouvel id
        uint256 newTokenId = _tokenIds;
        _safeMint(recipient, newTokenId);  // vérifie que le destinataire accepte le NFT
        _setTokenURI(newTokenId, baseURI); // associe les métadonnées IPFS
        return newTokenId;
    }

    // Changer l'URI de base des prochains mints (réservé au propriétaire) :
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}
