const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir a rede
const network = bitcoin.networks.testnet;

// Caminho de derivação para P2SH SegWit
const path = `m/49'/1'/0'/0`;

// Gerar a frase mnemônica e a semente
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criar a raiz da carteira
let root = bip32.fromSeed(seed, network);

// Derivar a conta e o nó
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Criar o endereço P2SH SegWit
let btcAddress = bitcoin.payments.p2pkh({
	pubkey: node.publicKey,
  network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);
