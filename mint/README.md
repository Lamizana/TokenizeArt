<div align="center">
    <h1>Mint du NFT</h1>
    <p>
        <em>Minage du jeton non fongible <strong>Zehd42 (Z42)</strong>.</em>
    </p>
</div>

---

## Contrat

- Adresse : `0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9`
- Réseau : **BNB Smart Chain Testnet** (chainId `97`)
- Jeton sur l'explorateur : <https://testnet.bscscan.com/token/0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9?a=1>

---

## Comment miner

1. Ouvrir `code/zehd42.sol` dans Remix (édition "Deployed Contracts" ou
   nouveau déploiement).
2. Appeler `mintNFT(address recipient)`: **réservé au `owner`** (`onlyOwner`,
   ici `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`).
3. Le `tokenId` est attribué automatiquement (compteur privé démarrant à 1).

---

## Démonstration réalisée

| Appel | Résultat |
| --- | --- |
| `mintNFT(0x69eF124b2033A69C6061cf88FfFBAE913E169fB2)` | `tokenId = 1` (succès sur chaîne) |
| `ownerOf(1)` | `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2` |
| `tokenURI(1)` | `https://gateway.pinata.cloud/ipfs/bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe` |

Vérifications effectuées en lecture sur la chaîne (BSC Testnet) : `baseURI()`,
`tokenURI(1)`, `ownerOf(1)`.

---

## Notes

- Les métadonnées (JSON) pointent vers l'image épinglée sur IPFS (voir `documentation/IPFS.md`).
- `setBaseURI(...)` (onlyOwner) permet de changer l'URI des **prochains** mints sans redéployer ; les tokens déjà minés conservent leur `tokenURI`.

---
