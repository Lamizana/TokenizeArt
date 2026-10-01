<div align="center">
    <h1>Pinata</h1>
    <img src="../images/logo_pinata.jpeg" alt="Icone NFT Glass" width="360" style="border-radius: 16px;">
    <p>
        <em>Pinata est un service d'<strong>épinglage (pinning) IPFS</strong>.</em>
    </p>
</div>

---

## Qu'est-ce que Pinata ?

Pinata est un service qui garantit que les fichiers restent disponibles et réplicables sur IPFS, avec une interface web souple pour les gérer.

C'est l'outil utilisé pour publier l'image et les métadonnées du NFT.

> [!TIP]
> Site : <https://www.pinata.cloud>
> Documentation : <https://docs.pinata.cloud>

---

## Pourquoi IPFS et pas un serveur classique ?

Avant de manipuler Pinata, il faut saisir pourquoi on ne met pas simplement l'image sur un site web classique. C'est une question que les évaluateurs adorent poser.

### Le problème du stockage centralisé

Si l'image vit sur un seul serveur (celui d'un hébergeur, d'un site, d'un réseau social…), tout dépend de ce point unique. Ce serveur peut :

- Tomber en panne: l'image disparaît.
- Fermer ou supprimer le contenu: les liens deviennent "morts".
- Etre censuré ou modifié sans ton accord.

> [!INFO]
> Un NFT est censé durer et prouver durablement une propriété. Le lier à un serveur central fragile est donc contre-productif.

### Qu'est-ce qu'IPFS ?

IPFS (*InterPlanetary File System*) est un système de fichiers **distribué et pair-à-pair** : un fichier y est identifié par son contenu (le **CID**) et doit être **épinglé** pour rester disponible.

Pour la définition complète (adressage par contenu, immuabilité, épinglage, passerelles), voir [`IPFS.md`](./IPFS.md).

### Passerelles (gateways)

Les navigateurs ne parlent pas IPFS nativement. Les passerelles sont des sites web qui traduisent une adresse IPFS en URL web classique, par exemple :

```text
https://gateway.pinata.cloud/ipfs/QmXy1...VOTRE_CID...
```

### Pourquoi Pinata ?

Pinata est un **service d'épinglage** (*pinning service*). Plutôt que de monter et entretenir son propre nœud IPFS (technique, coûteux, fragile), Pinata héberge et épingle les fichiers pour nous, tout en offrant une interface web, des statistiques et une API. C'est l'un des prestataires les plus utilisés dans l'écosystème NFT.

### Serveur classique vs IPFS (+ Pinata)

| Critère | Serveur classique | IPFS (+ Pinata) |
| --- | --- | --- |
| Adressage | Par emplacement (URL) | Par contenu (CID) |
| Infrastructure | Centralisée, un point unique | Distribuée, pair-à-pair |
| Risque de lien mort | Élevé (panne, fermeture, censure) | Faible si épinglé |
| Modification | Possible sur place | Impossible (CID = contenu figé) |
| Durabilité | Dépend du serveur unique | Dépend de l'épinglage (géré par Pinata) |

> [!NOTE]
> **Lien avec le sujet** : le sujet exige un stockage via « registre distribué (IPFS, par exemple) ». Choisir Pinata pour héberger et épingler nos fichiers sur IPFS est donc un choix justifiable, à défendre à l'évaluation.

---

## Rôle dans le projet

- Pinata sert à épingler l'image (`Zehd42.png`) et les métadonnées (`code/zehd42.json`).
  Les CIDs et leur vérification sont détaillés dans [`IPFS.md`](./IPFS.md).

---

## Prérequis : préparer l'image

Avant de publier sur IPFS, on prépare le « visage » du NFT :

- une image originale contenant le chiffre **42** clairement lisible (exigence du sujet) ;
- un format `.png` ou `.jpg` ;
- aucun terme ni contenu insultant (sous peine de sanctions).

> L'image n'est pas stockée dans le dépôt Git comme unique copie : le sujet exige un registre distribué (IPFS). On la publie à l'étape suivante.

---

## Utilisation de Pinata

L'offre **gratuite** (free) suffit largement pour ce projet : elle offre un quota de stockage et d'épinglage très large pour quelques fichiers.

### Créer un compte

1. Aller sur <https://www.pinata.cloud> et cliquer sur **Sign Up**.
2. Créer le compte (e-mail + mot de passe) puis confirmer.
3. Une fois connecté, on arrive sur le tableau de bord : l'onglet **Files** liste les fichiers épinglés.

> [!NOTE]
> **Clé API (optionnel)** : dans **API Keys**, on peut créer une clé (API Key + Secret) pour gérer les fichiers par programmation. Utile pour automatiser, mais pas nécessaire pour le projet. Garder le secret confidentiel.

### Uploader l'image

1. Dans l'onglet **Files**, cliquer sur **Add Files** → **File**.
2. Sélectionner l'image (`.png` ou `.jpg`), ou la déposer par glisser-déposer.
3. Cliquer sur **Upload**.
4. Quelques secondes plus tard, le fichier apparaît dans la liste avec une colonne **CID** (du type `QmXy1...`). Cliquer sur l'icône de copie pour le récupérer.

### Vérifier et comprendre

1. Tester l'image à l'adresse `https://gateway.pinata.cloud/ipfs/<CID>` : elle doit s'afficher dans le navigateur.
2. Le CID est unique et figé : il identifie exactement ce contenu. Modifier l'image donnera un nouveau CID (l'ancien restera intact).
3. Tant que le fichier reste dans la liste Pinata (*Pinned*), il reste disponible sur IPFS. Ne pas le supprimer du tableau de bord.

> [!WARNING]
> **Propagation IPFS** : un fichier tout juste publié peut mettre quelques secondes à quelques minutes à être visible via toutes les passerelles. Si le lien est vide, attendre puis recharger.

**Vérification** : l'image s'ouvre via le lien IPFS = étape réussie.
