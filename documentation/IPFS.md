<h1 align="center">IPFS</h1>

---

## Qu'est-ce qu'IPFS ?

L'**IPFS** (*InterPlanetary File System*) est un protocole **pair à pair** de distribution de contenu adressable par [**hypermédia**](https://fr.wikipedia.org/wiki/Hyperm%C3%A9dia), conçu à l'origine par Juan Benet. L'implémentation principale d'IPFS est un logiciel libre **écrit en go**.

C' est un système de fichier **distribué** et **adressé par contenu** ; chaque fichier reçoit :

- Un **CID** (*Content Identifier*)
- Une empreinte cryptographique figée.

Le même contenu produit le même CID, où que ce soit sur le réseau. Les fichiers sont répliqués entre les nœuds, ce qui les rend résistants à la censure et sans point de défaillance unique.

> [!WARNING]
> Un CID pointe vers un contenu **immuable** ; pour garantir la disponibilité, le fichier doit être **épinglé** (pinning) par au moins un service (voir `PINATA.md`).

---

## Rôle dans le projet

Le sujet exige que l'image du NFT soit stockée sur un registre distribué.

Deux fichiers sont publiés sur IPFS :

| Fichier | Contenu | CID (IPFS) | Vérification |
| --- | --- | --- | --- |
| `Zehd42.png` | l'œuvre avec le **42** lisible | `bafybeiejl5obawdmnf7ptq7xx7wuttc4ri274x4vbstwby3wbcb44eejcu` | HTTP 200, `image/png`, 2 020 901 octets |
| `code/zehd42.json` | métadonnées NFT (`Z42`, description, image, attributs) | `bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe` | JSON valide servi par la passerelle |

---

## Passerelles (gateways)

Les navigateurs ne parlent pas IPFS nativement. Une **passerelle** traduit un CID en URL web classique :

- Métadonnées : <https://gateway.pinata.cloud/ipfs/bafkreibd2pph7dcwz7ewgtr73x3iwxmibux4bsb5ebqtg242n2numeb4pe>
- Image : <https://gateway.pinata.cloud/ipfs/bafybeiejl5obawdmnf7ptq7xx7wuttc4ri274x4vbstwby3wbcb44eejcu>

---

## Démarche suivie

1. Créer l'image de l'œuvre (le `42` doit être lisible).
2. Épingler `Zehd42.png` sur IPFS (via Pinata): **CID image**.
3. Rédiger `code/zehd42.json` dont le champ `image` pointe vers l'URL de
   passerelle du CID image (ou un URI `ipfs://`).
4. Épingler `zehd42.json`: **CID JSON**.
5. Déployer le contrat `Zehd42` avec `_baseURI = https://gateway.pinata.cloud/ipfs/<CID_JSON>`.

---

## Leçons apprises

- `tokenURI` doit pointer vers le **JSON de métadonnées**, pas directement vers
  l'image (sinon les wallets affichent une case vide).
- Utiliser une **URL HTTPS de passerelle** pour l'affichage garanti dans les
  wallets (les URI `ipfs://` dépendent de la passerelle interne du wallet).
- Vérifier qu'aucun caractère parasite (espace en tête) ne traîne dans une URL
  d'un fichier JSON (bug constaté en cours de projet).
