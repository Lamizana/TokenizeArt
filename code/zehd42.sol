// SPDX-License-Identifier: MIT
// Zehd42 - NFT non fongible (standard BEP-721 / ERC-721) sur la BNB Chain
// Nom de la collection : Zehd42 - Symbole : Z42
pragma solidity ^0.8.20;

// Import du contrat ERC-721 d'OpenZeppelin v5.1.0:
// - ERC721 : le standard des jetons non fongibles (ownerOf, balanceOf, transfert...)
// - ERC721URIStorage : ajoute le stockage d'une URI de metadonnees par token
// - Ownable : gestion securisee et auditee de la propriete
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.1.0/contracts/access/Ownable.sol";

// Le contrat herite de la norme ERC-721 (via ERC721URIStorage) et d'Ownable.
// Les fonctions du standard (ownerOf, balanceOf, transferFrom, safeTransferFrom...)
// sont donc deja fournies par OpenZeppelin, sans avoir a les reecrire.
contract Zehd42 is ERC721URIStorage, Ownable {
    // Compteur des tokens deja crees (les ids commencent a 1).
    // On utilise un simple uint256 : la bibliotheque Counters d'OpenZeppelin
    // a ete retiree en v5, c'est donc la maniere recommandee aujourd'hui.
    uint256 private _tokenIds;

    // URI de base pointe vers les metadonnees du NFT (IPFS).
    // Exemple : https://gateway.pinata.cloud/ipfs/<CID_JSON>
    string public baseURI;

    // A la construction :
    // - on fixe le nom et le symbole de la collection : ERC721("Zehd42", "Z42") ;
    // - on attribue la propriete du contrat au deployeur : Ownable(msg.sender) ;
    // - on stocke l'URI de base passee en argument (_baseURI).
    constructor(
        string memory _baseURI
    ) ERC721("Zehd42", "Z42") Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    // Cree (mine) un nouveau NFT pour `recipient` et renvoie son tokenId.
    // - onlyOwner : seul le proprietaire de la collection peut miner (securite) ;
    // - le tokenId est attribue automatiquement (1, 2, 3...) via le compteur ;
    // - _safeMint verifie que le destinataire accepte le NFT (norme ERC-721) ;
    // - _setTokenURI associe les metadonnees IPFS (baseURI) au token.
    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;
        _safeMint(recipient, newTokenId); // verifie que le destinataire accepte le NFT
        _setTokenURI(newTokenId, baseURI); // associe les metadonnees IPFS au token
        return newTokenId;
    }

    // Permet au proprietaire de mettre a jour l'URI de base des metadonnees (IPFS)
    // sans redeployer le contrat. Ne concerne que les tokens non encore min :
    // les tokens deja mines conservent leur tokenURI, fige au moment du mint.
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}
