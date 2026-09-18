# TokenizeArt

> Ce projet permet d'apprendre les bases du web3. Nous allons créer notre propre jeton non fongible !

> Fait le 31/08/2026

---

## Préambule

| Mots clés     | Compétences               |
| ---           | ----                      |
| Web3 général  | Intégration technologique |
|               | Adaptation et créativité  |
|               |Rigueur                    |

Ce projet est le fruit d'un partenariat entre 42 et [BNB Chain](https://www.bnbchain.org/en).

> **Build N Build** (BNB) Chain est un réseau blockchain distribué sur lequel les développeurs et les innovateurs peuvent créer des applications décentralisées (DApps) dans le cadre de la transition vers le Web3.

En octobre 2022, la BNB Chain est la ***plus grande blockchain de contrats intelligents au monde*** en termes de volume de transactions et d’utilisateurs actifs quotidiens. Au moment de la rédaction de cet article, *elle a traité 3 milliards de transactions provenant de 232 millions d’adresses uniques*, et dispose d’un écosystème comptant plus de **1 500 DApps** actives. La nature décentralisée du réseau signifie que n’importe qui peut développer un produit sur la BNB Chain sans avoir à demander d’autorisation, et potentiellement toucher un public très large.

Vous pouvez obtenir gratuitement des Tbnb, sans montant minimum requis dans votre portefeuille, via cefaucet : [BNB Chain Faucet](https://www.bnbchain.org/)

---

## Introduction

Bienvenue dans l'univers passionnant de la technologie blockchain !

Avez-vous déjà rêvé de créer votre propre **jeton numérique non fongible** ?

C’est maintenant l’occasion de concrétiser ce rêve.

*La technologie blockchain permet la création et la distribution d’actifs numériques uniques, appelés « jetons »*. Ces jetons peuvent représenter un large éventail de choses, allant d’une simple représentation monétaire à des actifs plus complexes comme des œuvres d’art, voire des actifs du monde réel.
Le processus de création de votre propre jeton n’est pas sans difficultés, mais avec les bonnes connaissances et les bonnes ressources, cela peut être une expérience enrichissante et épanouissante.

Alors, pourquoi attendre ?

Lancez-vous dès aujourd’hui dans la création de votre tout **premier jeton non fongible sur la blockchain** !

---

## Objectif principal

### Creer son propre jeton NFT

Pour créer un jeton, plusieurs exigences techniques doivent être respectées.

> [!NOTE]
> Vous êtes libre de choisir la représentation de votre jeton non fongible.
> Votre seule contrainte est d’y inclure le chiffre 42. Il est bien sûr interdit d’utiliser des termes ou des images insultants, sous peine de sanctions.

Le nombre 42 doit etre lisible.

> Votre image doit être stockée à l'aide d'une technologie de registre distribué (IPFS, par exemple).

---

### Mise en œuvre du contrat

On doit créer un fichier `README.md` à la racine de notre dépôt pour expliquer les choix que l'on a faits et les raisons qui les ont motivés.

> Le langage utilisé est bien sûr libre, mais vous devez respecter les normes de la blockchain que vous comptez utiliser (par exemple `ERC721` pour **ETH**, ou `BEP-721` pour **BSC**).

Avant toute chose, vous devrez choisir une plateforme blockchain prenant en charge la création de jetons non fongibles. Il existe de nombreuses options différentes, chacune présentant ses propres caractéristiques et fonctionnalités.

> Vous devez également gérer les métadonnées de votre NFT (le nom de l'artiste doit correspondre à votre identifiant et doit comporter le chiffre *42* ainsi qu'un titre).

Une fois que vous aurez choisi une plateforme, vous devrez maîtriser le langage de programmation utilisé par celle-ci afin de développer votre jeton non fongible. Chaque plateforme utilise un langage de programmation qui lui est propre ; vous devrez donc vous assurer que vous disposez des compétences nécessaires pour travailler avec le langage de la plateforme que vous aurez choisie, comme [IDE](https://chainide.com/), [Truffle](https://archive.trufflesuite.com/boxes/BSC-Truffle-Starter-Box/), [Remix](https://docs.bnbchain.org/docs/remix-new/) ou [Hardhat](https://docs.bnbchain.org/docs/hardhat-new/).

> [!WARNING]
> Assurez-vous de bien comprendre ce que vous faites. On ne vous demandera jamais d’utiliser de l’argent réel ou vos cryptomonnaies pour ce projet. Il existe des chaînes de test permettant d’éviter ce problème, comme la chaîne ***BSC Testnet***.

Vous devez placer le code utilisé pour créer votre jeton non fongible dans un dossier « `code` » situé à la racine de votre dépôt. Veillez à **bien commenter votre code** et à utiliser des noms de variables et de fonctions lisibles et explicites.

> Au cours de votre évaluation, une révision du code sera effectuée.

Vous devez faire très attention à la manière dont vous présentez le fonctionnement de votre jeton non fongible. Vous devez être capable d'effectuer des actions minimales pour en démontrer le fonctionnement. Vous devez prendre en compte tous les aspects liés à la sécurité, tels que la propriété ou les privilèges.

---

### Miner son NFT

Vous devez également placer tous les fichiers nécessaires au déploiement de votre jeton non fongible dans un deuxième dossier dont vous choisirez le nom.

Une fois que vous aurez créé votre jeton non fongible sur une blockchain publique, veuillez indiquer l'adresse publique et le réseau utilisés dans votre dépôt Git. Vous devriez alors pouvoir afficher votre NFT.

> [!WARNING]
> Vous devez pouvoir identifier le propriétaire d'un NFT, par exemple à l'aide de la fonction `ownerOf` en **Solidity**.

Enfin, vous devriez disposer d'un dossier contenant la documentation relative à ce projet. Ce dossier, nommé « `documentation` », doit **se trouver à la racine de votre référentiel.** Il doit être possible de comprendre son fonctionnement et ce qui est nécessaire pour utiliser votre jeton non fongible.

Vous devrez bien comprendre comment votre NFT sera utilisé et ce qu’ il représentera. Cela peut nécessiter la rédaction d’un livre blanc ou d’un autre document décrivant les caractéristiques et les fonctionnalités de votre jeton non fongible.

> [!IMPORTANT]
> Vous devez prendre le temps de rédiger une documentation claire et précise. Celle-ci sera examinée lors de votre évaluation.

Pensez également à créer une vidéo de démonstration pour présenter votre NFT et ses fonctionnalités aux utilisateurs et investisseurs potentiels.

> [!NOTE]
> Si vous souhaitez réaliser une vidéo de démonstration, vous n'êtes pas obligé de l'ajouter à votre référentiel ; un simple lien suffira ! La création d'une vidéo de démonstration n'est pas obligatoire. Vous n'obtiendrez pas une meilleure note en réalisant cette vidéo.

Vous trouverez ci-dessous un exemple de la structure de répertoires attendue :

```bash
$> ls -al
total XX
drwxrwxr-x 3 eagle eagle 4096 avril 42 20:42 .
drwxrwxrwt 17 eagle eagle 4096 avril 42 20:42 ..
-rw-rw-r-- 1 eagle eagle XXXX avril 42 20:42 README.md
drwxrwxr-x 3 eagle eagle 4096 avril 42 20:42 code
drwxrwxr-x 3 eagle eagle 4096 avril 42 20:42 deployment
drwxrwxr-x 3 eagle eagle 4096 avril 42 20:42 mint
drwxrwxr-x 3 eagle eagle 4096 avril 42 20:42 documentation
```

---

## Objectif secondaire

Voici quelques bonus qui pourraient vous être très utiles :

- Un superbe NFT
- Un site web où vous pouvez miner votre NFT grâce à une interface graphique
- Vous devez gérer les inscriptions de vos NFT, c'est-à-dire stocker vos métadonnées et votre image directement sur la blockchain

> [!WARNING]
> La partie bonus ne sera évaluée que si la partie obligatoire est PARFAITE. « Parfaite » signifie que la partie obligatoire a été réalisée dans son intégralité et qu’elle fonctionne sans aucun dysfonctionnement. Si vous n’avez pas satisfait à TOUTES les exigences obligatoires, votre partie bonus ne sera pas évaluée du tout.

> À titre exceptionnel pour ce projet, nous vous recommandons de partager votre projet via votre compte Git personnel une fois que celui-ci sera valide. N'hésitez pas à utiliser différents hashtags en fonction du langage de programmation utilisé, mais aussi « web3 », etc.
