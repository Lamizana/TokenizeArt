# Deploiement NFT Zehd42 (TokenizeArt / Z42)

Réseau : **BNB Smart Chain Testnet** (chainId `97`)

- Explorateur : <https://testnet.bscscan.com>
- Contrat : <https://testnet.bscscan.com/address/0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9>
- ABI du contrat : [`abi.json`](./abi.json)

## Outil utilisé : Remix IDE

[Remix](https://remix.ethereum.org) est une application open source permettant de développer,
compiler, déployer et tester des smart-contracts compatibles EVM (dont la BNB Smart Chain).

Le contrat `code/zehd42.sol` a été compilé avec Solidity `^0.8.20`, puis déployé via
l'environnement **« Injected Provider - MetaMask »** connecté à la **BSC Testnet**.

## Adresse du contrat (deploiement valide)

- Adresse du contrat : `0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9`
- Emetteur (deployeur / owner) : `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`
- `baseURI` (metadonnees IPFS) : `https://gateway.pinata.cloud/ipfs/bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe`
- CID image (IPFS) : `bafybeiejl5obawdmnf7ptq7xx7wuttc4ri274x4vbstwby3wbcb44eejcu`
- `ownerOf(1)` : `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`
- Vérifié sur BscScan : **Oui** (code source public)

## Transaction de deploiement

- Hash : `0x717d3eaf6b7001b2dee9e4cc29d15b94fb7023ce89e42379c3c475ddb5663232`
- Bloc : `133876136` (statut succès)
- Contrat créé : `0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9`

## Paramètres de compilation

- Compilateur : Solidity **0.8.24** (pragma `^0.8.20`, EVM par défaut) — v1.0 de `code/zehd42.sol`
- Optimisation : désactivée
- Dépendances : **OpenZeppelin v5.1.0** (imports par URL GitHub raw dans le fichier)

## Configuration réseau — BSC Testnet

| Paramètre | Valeur |
| --- | --- |
| Nom du réseau | BSC Testnet |
| Chain ID | 97 |
| URL RPC | `https://data-seed-prebsc-1-s1.binance.org:8545/` |
| Symbole du gas | tBNB |
| Explorateur | `https://testnet.bscscan.com` |

## Historique

Plusieurs deploiements ont ete faits sur le testnet avant le deploiement valide :

1. `0xb6e002d16F930810038BCD9597e7aA56Ea729262` : `baseURI` **errone** (CID de
   l'image au lieu du CID du JSON) -> `tokenURI` renvoyait un JPEG a la place des
   metadonnees (NFT illisible). **Obsolete.**
2. `0x3f284695a4DF478e4fF839ce396b8c2Cff2d97c9` : `baseURI` en `ipfs://` -> non
   resolu par MetaMask sur BSC Testnet, image absente. **Obsolete.**
3. `0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9` : `baseURI` en **HTTPS** de
   passerelle -> **deploiement valide** (voir ci-dessus).

## Procédure de test post-déploiement

Vérifications effectuées via l'onglet **Read Contract** de [BscScan](https://testnet.bscscan.com) :

| Étape | Fonction | Résultat attendu |
| --- | --- | --- |
| 1 | `ownerOf(1)` | `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2` |
| 2 | `tokenURI(1)` | `https://gateway.pinata.cloud/ipfs/bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe` |
| 3 | `name()` | `Zehd42` |
| 4 | `symbol()` | `Z42` |
| 5 | `baseURI()` | `https://gateway.pinata.cloud/ipfs/bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe` |

### Tests interactifs (via MetaMask ou l'onglet Write Contract)

1. **Mint** : `mintNFT(adresse)` depuis le wallet owner → vérifier `ownerOf` du nouveau token.
2. **Mint (refus)** : `mintNFT(...)` depuis un wallet **non-owner** → échec attendu (« caller is not the owner »).
3. **TransferOwnership** : `transferOwnership(nouvelleAdresse)` → vérifier que `owner()` change.

## Note

Le contrat comporte `setBaseURI` (onlyOwner) pour corriger les metadonnees des
prochains mints sans redeployer.

## Qu'est-ce que l'ABI ?

L'ABI (*Application Binary Interface*) décrit les fonctions, événements et erreurs d'un
contrat, et permet d'encoder les appels / décoder les résultats. [`abi.json`](./abi.json)
est l'ABI du contrat `Zehd42`, à utiliser pour interagir avec le NFT (MetaMask, Ethers.js, Web3.js…).
