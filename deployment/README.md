# Deploiement NFT Zehd42 (TokenizeArt / Z42)

Réseau : **BNB Smart Chain Testnet** (chainId `97`)

- Explorateur : <https://testnet.bscscan.com>
- Contrat : <https://testnet.bscscan.com/address/0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9>
- ABI du contrat : [`abi.json`](./abi.json)

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

## Historique

Plusieurs deploiements ont ete faits sur le testnet avant le deploiement valide :

1. `0xb6e002d16F930810038BCD9597e7aA56Ea729262` : `baseURI` **errone** (CID de
   l'image au lieu du CID du JSON) -> `tokenURI` renvoyait un JPEG a la place des
   metadonnees (NFT illisible). **Obsolete.**
2. `0x3f284695a4DF478e4fF839ce396b8c2Cff2d97c9` : `baseURI` en `ipfs://` -> non
   resolu par MetaMask sur BSC Testnet, image absente. **Obsolete.**
3. `0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9` : `baseURI` en **HTTPS** de
   passerelle -> **deploiement valide** (voir ci-dessus).

## Note

Le contrat comporte `setBaseURI` (onlyOwner) pour corriger les metadonnees des
prochains mints sans redeployer.