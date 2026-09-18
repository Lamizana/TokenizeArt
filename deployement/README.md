# Deploiement — Token42 (TokenizeArt / T42)

Réseau : **BNB Smart Chain Testnet** (chainId `97`)

Explorateur : <https://testnet.bscscan.com>
Contrat : <https://testnet.bscscan.com/address/0x930A2d73e640d16915eEe47eEccDdfC169C96ecf>

## Adresse du contrat (deploiement valide)

- Adresse du contrat : `0x930A2d73e640d16915eEe47eEccDdfC169C96ecf`
- Emetteur (deployeur / owner) : `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`
- `baseURI` (metadonnees IPFS) : `https://gateway.pinata.cloud/ipfs/bafkreieesiwlm2va3n22ueeeaqlyyh3ridgu2ujcwlmzweo5tdtlljtbou`
- `tokenURI(1)` : identique (JSON de metadonnees -> champ `image` HTTP 200, `image/jpeg`)
- `ownerOf(1)` : `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`

## Transaction de deploiement

- Hash : `0x7b9d96064d02f300d44222b7b6222975838ac0f72cd1e208ef4f165b13255fa7`
- Bloc : `129604732` (statut succès)
- Contrat créé : `0x930A2d73e640d16915eEe47eEccDdfC169C96ecf`

## Paramètres de compilation

- Compilateur : Solidity **0.8.24** (pragma `^0.8.20`, EVM par défaut) — v1.0 de `code/tokenizeArt42.sol`
- Optimisation : désactivée
- Dépendances : **OpenZeppelin v5.1.0** (imports par URL GitHub raw dans le fichier)

## Historique

Un premier deploiement (`0xb6e002d16F930810038BCD9597e7aA56Ea729262`) avait un
`baseURI` **errone** (CID de l'image au lieu du CID du JSON) : `tokenURI`
renvoyait un JPEG a la place des metadonnees -> NFT illisible (image blanche
dans les wallets). Il est **obsolete** et remplace par le deploiement valide
ci-dessus.

## Note

La verification du code source sur BscScan n'est pas exigee par le sujet ; le
deploiement et la consultation de l'adresse sur l'explorateur suffisent.
Le contrat comporte `setBaseURI` (onlyOwner) pour corriger les metadonnees des
prochains mints.