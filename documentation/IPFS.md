# IPFS

> Site : <https://ipfs.tech>
> Documentation : <https://academy.bit2me.com/fr/qu'est-ce-que-ipfs/>

## Qu'est-ce qu'IPFS ?

L'**IPFS** (*InterPlanetary File System*) est un système de fichier **distribué**
et **adressé par contenu** : chaque fichier reçoit un **CID** (*Content
Identifier*), une empreinte cryptographique figée. Le même contenu produit le
même CID, où que ce soit sur le réseau. Les fichiers sont répliqués entre les
nœuds, ce qui les rend résistants à la censure et sans point de défaillance
unique.

⚠️ Un CID pointe vers un contenu **immuable** ; pour garantir la disponibilité,
le fichier doit être **épinglé** (pinning) par au moins un service (voir
`PINATA.md`).

## Rôle dans le projet

Le sujet exige que l'image du NFT soit stockée sur un registre distribué.
Deux fichiers sont publiés sur IPFS :

| Fichier | Contenu | CID (IPFS) | Vérification |
| --- | --- | --- | --- |
| `nft.jpeg` | l'œuvre avec le **42** lisible | `bafkreiegpfudye6ovifjlotmpo4nv6qqh4d2luci7agpurbtpo6mkj7734` | HTTP 200, `image/jpeg`, 171 425 octets |
| `code/metadata.json` | métadonnées NFT (`TKA42`, description, image, attributs) | `bafkreieesiwlm2va3n22ueeeaqlyyh3ridgu2ujcwlmzweo5tdtlljtbou` | JSON valide servi par la passerelle |

## Passerelles (gateways)

Les navigateurs ne parlent pas IPFS nativement ; une **passerelle** traduit un
CID en URL web classique :

- Métadonnées : <https://gateway.pinata.cloud/ipfs/bafkreieesiwlm2va3n22ueeeaqlyyh3ridgu2ujcwlmzweo5tdtlljtbou>
- Image : <https://gateway.pinata.cloud/ipfs/bafkreiegpfudye6ovifjlotmpo4nv6qqh4d2luci7agpurbtpo6mkj7734>

## Démarche suivie

1. Créer l'image de l'œuvre (le `42` doit être lisible).
2. Épingler `nft.jpeg` sur IPFS (via Pinata) → **CID image**.
3. Rédiger `code/metadata.json` dont le champ `image` pointe vers l'URL de
   passerelle du CID image (ou un URI `ipfs://`).
4. Épingler `metadata.json` → **CID JSON**.
5. Déployer le contrat `Token42` avec `_baseURI = https://gateway.pinata.cloud/ipfs/<CID_JSON>`.

## Leçons apprises

- `tokenURI` doit pointer vers le **JSON de métadonnées**, pas directement vers
  l'image (sinon les wallets affichent une case vide).
- Utiliser une **URL HTTPS de passerelle** pour l'affichage garanti dans les
  wallets (les URI `ipfs://` dépendent de la passerelle interne du wallet).
- Vérifier qu'aucun caractère parasite (espace en tête) ne traîne dans une URL
  d'un fichier JSON (bug constaté en cours de projet).