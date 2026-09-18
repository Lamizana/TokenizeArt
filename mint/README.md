# Mint du NFT

Minage du jeton non fongible `Token42` (TokenizeArt / T42).

## Contrat

- Adresse : `0x930A2d73e640d16915eEe47eEccDdfC169C96ecf`
- Réseau : **BNB Smart Chain Testnet** (chainId `97`)
- Jeton sur l'explorateur : <https://testnet.bscscan.com/token/0x930A2d73e640d16915eEe47eEccDdfC169C96ecf?a=1>

## Comment miner

1. Ouvrir `code/tokenizeArt42.sol` dans Remix (édition "Deployed Contracts" ou
   nouveau déploiement).
2. Appeler `mintNFT(address recipient)` — **réservé au `owner`** (`onlyOwner`,
   ici `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`).
3. Le `tokenId` est attribué automatiquement (compteur privé démarrant à 1).

## Démonstration réalisée

| Appel | Résultat |
| --- | --- |
| `mintNFT(0x69eF124b2033A69C6061cf88FfFBAE913E169fB2)` | `tokenId = 1` (succès sur chaîne) |
| `ownerOf(1)` | `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2` |
| `tokenURI(1)` | `https://gateway.pinata.cloud/ipfs/bafkreieesiwlm2va3n22ueeeaqlyyh3ridgu2ujcwlmzweo5tdtlljtbou` |

Vérifications effectuées en lecture sur la chaîne (BSC Testnet) : `baseURI()`,
`tokenURI(1)`, `ownerOf(1)`.

## Interface web (bonus M.2)

Une interface graphique permet de miner sans passer par Remix :

- `mint/index.html` + `mint/app.js` (ethers.js v5 chargé depuis un CDN) + `mint/abi.json` (ABI générée via `solc`).

### Lancer

1. Ouvrir `mint/index.html` directement dans le navigateur (fonctionne en `file://`).
   Une fois le fichier en ligne, préférer `python3 -m http.server --directory mint 8080` puis
   ouvrir <http://localhost:8080>.
2. Cliquer **Connecter MetaMask** (bascule automatique sur _BNB Smart Chain Testnet_, chainId `0x61`).
3. Le **Mint** instancie le contrat `Token42` (`0x930A…96ecf`) et appelle `mintNFT(account)`
   (minage vers le compte connecté). Le bouton n'aboutit **que pour le propriétaire**
   (`onlyOwner`) ; un visiteur voit l'erreur « caller is not the owner ».
4. Résultat : `tokenId` décodé de l'événement `Transfer` + lien BSCScan de la transaction.

La **visionneuse** (saisir un `tokenId`) est en lecture seule et fonctionne **sans wallet**
(lecture via un RPC public) : tout visiteur peut voir la collection (propriétaire, URI, image).

## Notes

- Les métadonnées (JSON) pointent vers l'image épinglée sur IPFS (voir
  `documentation/IPFS.md`).
- `setBaseURI(...)` (onlyOwner) permet de changer l'URI des **prochains** mints
  sans redéployer ; les tokens déjà minés conservent leur `tokenURI`.