<div align="center">
    <h1>ZEHD42 (Z42)</h1>
    <img src="../images/Zehd42.png" alt="NFT Zehd42" width="360" style="border-radius: 16px;">
    <p>
        <em>Livre Blanc du NFT ZEHD42</em>.
    </p>
</div>

---

## 1. Vision

ZEHD42 est un **jeton non fongible (NFT)** conforme à la norme **BEP-721 / ERC-721**, déployé sur la **BNB Smart Chain (testnet)**.

Il représente une œuvre unique portant le chiffre **42**: *"la réponse à la grande question sur la vie, l'univers et le reste..."* dans le cadre du partenariat pédagogique **42 × BNB Chain**.

Il illustre le cycle de vie complet d'un NFT :

- Création
- Minage
- Stockage distribué des métadonnées (IPFS)
- Vérification de la propriété.

---

## 2. Caractéristiques

| Propriété | Valeur |
| --- | --- |
| ***Nom*** | ZEHD42 |
| ***Symbole*** | Z42 |
| ***Norme*** | BEP-721 (compatible ERC-721) |
| ***Réseau*** | BNB Smart Chain Testnet (Chain ID 97) |
| ***Offre*** | 1 exemplaire unique (tokenId 1). collection extensible par le propriétaire |
| ***Mint*** | Réservé au propriétaire (`onlyOwner`) |
| ***Métadonnées*** | IPFS (épinglées via Pinata) |
| ***Contrat*** | [`0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9`](https://testnet.bscscan.com/address/0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9) |
| ***Vérification*** | Oui — code source public sur BscScan |
| ***ABI*** | [`abi.json`](../deployment/abi.json) — interface d'interaction avec le contrat (voir `deployment/`) |

---

## 3. Offre et rareté

- **Unicité** : chaque NFT est unique et non interchangeable (norme ERC-721), garanti par un
  `tokenId` propre.
- **Premier exemplaire miné** : le tokenId `1` a été miné vers le propriétaire
  (`0x69eF124b2033A69C6061cf88FfFBAE913E169fB2`): voir `ownerOf(1)`.
- **Collection extensible** : le compteur interne `_tokenIds` permet au propriétaire de miner d'autres NFT, mais chacun reste unique (aucune fongibilité).
- **Métadonnées immuables** : image et JSON sont épinglés sur IPFS ; leur CID est figé (toute modification produirait un nouveau CID).

---

## 4. Fonctionnement technique

Le contrat hérite d'`ERC721URIStorage` et d'`Ownable` (OpenZeppelin v5.1.0), qui fournissent nativement :

- `ownerOf(tokenId)`, `balanceOf(owner)` : propriété et solde d'une adresse.
- `transferFrom(from, to, tokenId)` / `safeTransferFrom(...)` : transfert d'un NFT.
- `approve` / `setApprovalForAll` / `getApproved` / `isApprovedForAll` : autorisations.
- `tokenURI(tokenId)` : URI des métadonnées du token.
- `owner()` / `transferOwnership(newOwner)` / `renounceOwnership()` : propriété du contrat.

### Fonctions spécifiques à ZEHD42

| Fonction | Description |
| --- | --- |
| `mintNFT(recipient)` | Crée (mine) un NFT pour `recipient` : incrémente `_tokenIds` (ids à partir de 1), `_safeMint` (vérifie que le destinataire accepte le NFT), puis `_setTokenURI(tokenId, baseURI)`. Réservé au propriétaire. |
| `setBaseURI(_newBaseURI)` | Met à jour l'URI de base des métadonnées (prochains mints) sans redéployer. Réservé au propriétaire. |
| `baseURI()` | Renvoie l'URI de base courante (métadonnées IPFS). Lecture. |

### Pas à pas de `constructor(_baseURI)`

```solidity
constructor(string memory _baseURI) ERC721("Zehd42", "Z42") Ownable(msg.sender) {
    baseURI = _baseURI;
}
```

1. **`ERC721("Zehd42", "Z42")`** : initialise le contrat avec le nom de la collection (`Zehd42`) et son symbole (`Z42`).
2. **`Ownable(msg.sender)`** : définit le déployeur (`msg.sender`) comme propriétaire du contrat — c'est lui qui pourra miner et gérer l'URI (`onlyOwner`).
3. **`baseURI = _baseURI`** : stocke l'URI de base des métadonnées (IPFS), passée en argument au déploiement.

> Le constructeur est exécuté **une seule fois**, au déploiement. L'URI de base peut ensuite être modifiée par le propriétaire via `setBaseURI`.

### Pas à pas de `mintNFT(recipient)`

```solidity
function mintNFT(address recipient) public onlyOwner returns (uint256) {
    _tokenIds += 1; // nouvel id
    uint256 newTokenId = _tokenIds;
    _safeMint(recipient, newTokenId); // vérifie que le destinataire accepte le NFT
    _setTokenURI(newTokenId, baseURI); // associe les métadonnées IPFS
    return newTokenId;
}
```

1. **`_tokenIds += 1`** : incrémente le compteur interne et prépare le prochain `tokenId` (les ids commencent à 1).
2. **`_safeMint(recipient, newTokenId)`** : crée (mine) le NFT et le transfère à `recipient`. La variante « safe » vérifie que le destinataire accepte le NFT (via `onERC721Received` s'il s'agit d'un contrat), évitant ainsi de le perdre.
3. **`_setTokenURI(newTokenId, baseURI)`** : associe l'URI des métadonnées IPFS au token ; c'est ce que renvoie `tokenURI(tokenId)`, et ce que les wallets lisent pour afficher l'image.
4. **`return newTokenId`** : renvoie l'identifiant du NFT créé.

> Le modificateur `onlyOwner` (hérité d'`Ownable`) restreint le mint au propriétaire : tout autre appel échoue avec `OwnableUnauthorizedAccount`.

### Pas à pas de `setBaseURI(_newBaseURI)`

```solidity
function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
}
```

1. **`baseURI = _newBaseURI`** : remplace l'URI de base stockée.
2. Seuls les **prochains** mints utiliseront la nouvelle URI ; les tokens **déjà minés** conservent leur `tokenURI` (figé au moment du mint).
3. Réservé au propriétaire (`onlyOwner`).

> Utilité : corriger une URI erronée **sans redéployer** le contrat.

---

## 5. Cas d'usage

- **Œuvre numérique unique** : certificat de propriété d'une création portant le 42.
- **Support de démonstration** : évaluations, tutoriels, présentations Web3.
- **Base de collection** : le contrat peut accueillir une collection ZEHD42.

---

## 6. Sécurité et gouvernance

- Seules deux actions sont privilégiées : `mintNFT` et `setBaseURI`, toutes deux protégées par `onlyOwner`.
- `_safeMint` vérifie que le destinataire accepte le NFT (norme ERC-721).
- `transferOwnership` émet `OwnershipTransferred` (traçable sur l'explorateur).
- Aucune fonction de pause, de blacklist ni de prélèvement : le détenteur garde le contrôle.
- **Zéro argent réel** : déploiement sur testnet uniquement.

---

## 7. Comment voir mon NFT ?

1. Ouvrir la page du contrat sur [BscScan Testnet](https://testnet.bscscan.com/address/0x3fcCab7bb70aa5BCA5706B83e6Fcf08F80526ce9).
2. Lire `ownerOf(1)` → `0x69eF124b2033A69C6061cf88FfFBAE913E169fB2` (le propriétaire).
3. Lire `tokenURI(1)` → URL des métadonnées IPFS (le champ `image` pointe vers l'œuvre).
4. (Optionnel) Importer le NFT dans MetaMask (BSC Testnet) avec l'adresse du contrat et le `tokenId` 1.

> Pour l'ABI et les informations de déploiement, voir [`deployment/README.md`](../deployment/README.md).
