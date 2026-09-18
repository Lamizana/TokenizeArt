# TokenizeArt

Création d'un premier NFT non fongible dans le cadre du projet **TokenizeArt** (partenariat 42 x BNB Chain).

## Choix techniques

| Sujet | Choix | Raisons |
| --- | --- | --- |
| Blockchain | **BNB Smart Chain Testnet** (chainId 97) | Recommandé par le sujet, frais de test gratuits via le faucet, pas de fonds réels. |
| Standard | **BEP-721 / ERC-721** | Standard natif des NFT sur BSC. |
| Bibliothèque | **OpenZeppelin v5.1.0** (via imports GitHub) | Bibliothèque éprouvée : sécurité (réentrance, transferts sûrs) et conformité ERC-721. La v5.1.0 est choisie car elle ne dépend pas de l'opcode `mcopy` (compilation simple en EVM par défaut). |
| Métadonnées | **IPFS** | Stockage distribué exigé par le sujet ; `metadata.json` contient le nom, la description, l'image et deux attributs. |
| Accès | `onlyOwner` (OpenZeppelin Ownable) | Seul le propriétaire de la collection peut miner un NFT ; le propriétaire peut être transféré avec `transferOwnership`. |
| Nom / symbole | `TokenizeArt` / `T42` | Le `42` est explicitement présent dans le nom du jeton. |

## Structure du dépôt

- `code/` — contrat Solidity `Token42` (`tokenizeArt42.sol`)
- `deployement/` — adresse du contrat déployé et réseau utilisé
- `documentation/` — sujet, tutoriel, guides IPFS/Pinata
- `mint/` — interface web de mint (`index.html`, `app.js`, `abi.json`) + démonstration
- `code/metadata.json` — métadonnées du NFT (IPFS)
- `nft.jpeg` — image de l'œuvre

## Bonus réalisé

- **Site web de mint** (`mint/`) : interface graphique qui connecte MetaMask,
  bascule sur BSC Testnet et appelle `mintNFT` sans Remix (réservé au `owner`) ;
  visionneuse en lecture seule pour les visiteurs.

## Démarrer

1. Copier `code/tokenizeArt42.sol` dans Remix IDE (web).
2. Compiler avec Solidity **0.8.20+** (imports OpenZeppelin v5.1.0 téléchargés depuis GitHub).
3. Déployer via **Injected Provider** (MetaMask) sur **BSC Testnet** en passant en argument `_baseURI` l'URL HTTPS de la passerelle IPFS vers le JSON de métadonnées (ex. `https://gateway.pinata.cloud/ipfs/<CID_JSON>`).
4. Miner : `mintNFT(adresseDestinataire)` puis vérifier avec `ownerOf(tokenId)`.

> NFT déployé sur **BSC Testnet** : `0x930A2d73e640d16915eEe47eEccDdfC169C96ecf`
> (voir `deployement/` pour l'adresse, le hash et les paramètres, et `mint/` pour la démonstration du mint).