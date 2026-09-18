# Pinata

> Site : <https://www.pinata.cloud>
> Documentation : <https://docs.pinata.cloud>

## Qu'est-ce que Pinata ?

Pinata est un service d'**épinglage (pinning) IPFS** : il garantit que les
fichiers restent disponibles et réplicables sur IPFS, avec une interface web
souple pour les gérer. C'est l'outil utilisé pour publier l'image et les
métadonnées du NFT.

## Rôle dans le projet

- Épinglage de `nft.jpeg` → CID `bafkreiegpfudye6ovifjlotmpo4nv6qqh4d2luci7agpurbtpo6mkj7734`
- Épinglage de `code/metadata.json` → CID `bafkreieesiwlm2va3n22ueeeaqlyyh3ridgu2ujcwlmzweo5tdtlljtbou`

## Procédure (Pinata Files)

1. Se connecter à <https://app.pinata.cloud> → onglet **Files**.
2. **Add Files** → sélectionner le fichier (image ou JSON).
3. Quelques secondes plus tard, le fichier apparaît avec une colonne **CID** → copier le CID.
4. Vérifier l'accès : `https://gateway.pinata.cloud/ipfs/<CID>`.

## Sécurité

⚠️ Une version précédente de ce fichier contenait une **clé API**, un **secret**
et un **JWT** en clair. Ils ont été retirés de ce dépôt : ils doivent être
considérés comme **compromis** et donc **révoqués/régénérés** dans la console
Pinata (API Keys) avant toute mise en visibilité publique du dépôt.

Règle d'or : **ne jamais committer de secrets** (clés, JWT, mots de passe).