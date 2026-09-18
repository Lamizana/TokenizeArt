// Token42 - front de mint (BNB Smart Chain Testnet)
// L'ABI est regeneree depuis le contrat (solc) et stockee aussi dans abi.json.
const CONTRACT_ADDRESS = "0x930A2d73e640d16915eEe47eEccDdfC169C96ecf";
const TX_EXPLORER = "https://testnet.bscscan.com/tx/";

const BSC_TESTNET = {
  chainId: "0x61",
  chainName: "BNB Smart Chain Testnet",
  nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

// ABI complete (generee via solc, voir abi.json)
const CONTRACT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"mintNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

let provider, signer, nft, account;

const $ = (id) => document.getElementById(id);

// ---- Connexion MetaMask + bascule sur BSC Testnet ----
async function connect() {
  const msg = $("status");
  msg.textContent = "Connexion...";
  if (!window.ethereum) {
    msg.textContent = "MetaMask introuvable. Installe l'extension et recharge la page.";
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  [account] = await provider.send("eth_requestAccounts", []);
  const chainId = await provider.getNetwork().then((n) => "0x" + n.chainId.toString(16));
  if (chainId !== BSC_TESTNET.chainId) {
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BSC_TESTNET.chainId }] });
    } catch (e) {
      if (e.code === 4902) {
        await window.ethereum.request({ method: "wallet_addEthereumChain", params: [BSC_TESTNET] });
      } else {
        throw e;
      }
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    [account] = await provider.send("eth_requestAccounts", []);
  }
  signer = provider.getSigner();
  nft = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  $("addr").textContent = account;
  $("mint").disabled = false;
  await loadCollectionInfo();
  msg.textContent = "Connecte sur BSC Testnet (" + account + ")";
}

// ---- Infos lecture seule (visibles par tous) ----
async function loadCollectionInfo() {
  const [n, s, o] = await Promise.all([
    nft.name(),
    nft.symbol(),
    nft.owner(),
  ]);
  $("cname").textContent = n + " (" + s + ")";
  $("cowner").textContent = o;
}

// ---- Visionneuse d'un token (lecture seule, sans MetaMask) ----
async function viewToken() {
  const id = $("tokenId").value.trim();
  const out = $("viewer");
  out.innerHTML = "Chargement...";
  if (!id) { out.innerHTML = "Saisis un tokenId."; return; }
  // Contrat en lecture seule : fonctionne sans MetaMask (visiteurs)
  const read = nft || new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, new ethers.providers.JsonRpcProvider(BSC_TESTNET.rpcUrls[0]));
  try {
    const owner = await read.ownerOf(id);
    const uri = await read.tokenURI(id);
    let img = "";
    try {
      const res = await fetch(uri);
      const meta = await res.json();
      img = meta.image || "";
    } catch (_) { img = uri; }
    out.innerHTML =
      "<b>TokenId :</b> " + id + "<br>" +
      "<b>Owner :</b> " + owner + "<br>" +
      "<b>tokenURI :</b> <a href='" + uri + "' target='_blank' rel='noopener'>" + uri + "</a><br>" +
      (img ? "<img src='" + img + "' alt='NFT' style='max-width:260px;margin-top:8px;border-radius:8px;'>" : "");
  } catch (e) {
    out.innerHTML = "Erreur (token inexistant ?) : " + (e.reason || e.message);
  }
}

// ---- Mint : seul le proprietaire du contrat peut minter (onlyOwner) ----
async function mint() {
  if (!nft) { await connect(); }
  const out = $("result");
  out.innerHTML = "Signature en cours...";
  try {
    const tx = await nft.mintNFT(account); // minage vers soi-meme
    out.innerHTML = "Transaction envoyee : <a href='" + TX_EXPLORER + tx.hash + "' target='_blank' rel='noopener'>" + tx.hash
      + "</a><br>Attente de confirmation...";
    const receipt = await tx.wait();
    // Decodage du tokenId depuis l'evenement Transfer (3e topic indexe)
    const transfer = receipt.logs.find((l) => l.topics && l.topics[0] === ethers.utils.id("Transfer(address,address,uint256)"));
    const tokenId = ethers.BigNumber.from(transfer.topics[3]).toString();
    out.innerHTML =
      "<b>NFT mine !</b><br>" +
      "tokenId : <b>" + tokenId + "</b><br>" +
      "Transaction : <a href='" + TX_EXPLORER + tx.hash + "' target='_blank' rel='noopener'>" + tx.hash + "</a>"
      + " (confirmee)";
    $("tokenId").value = tokenId;
    await viewToken();
  } catch (e) {
    let m = e.reason || e.message || "Echec.";
    if (e.code === 4001) m = "Transaction refusee dans MetaMask.";
    if (/caller is not the owner/i.test(m)) m = "Seul le proprietaire du contrat peut miner (onlyOwner).";
    out.innerHTML = "Erreur : " + m;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("connect").addEventListener("click", connect);
  $("mint").addEventListener("click", mint);
  $("view").addEventListener("click", viewToken);
});