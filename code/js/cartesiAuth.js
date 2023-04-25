const connectButton = document.getElementById("connectButton");
const patientForm = document.getElementById("patientForm")
const walletID = document.getElementById("walletID");

const HARDHAT_LOCALHOST_RPC_URL = 'http://localhost:8545';
const HARDHAT_DEFAULT_MNEMONIC = 'your twelve word mnemonic phrase goes here';
const LOCALHOST_DAPP_ADDRESS = '0x1234567890123456789012345678901234567890';

// var ethers = require('ethers');  
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

connectButton.addEventListener("click", () => {
   if (typeof window.ethereum !== "undefined") {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                const account = accounts[0];

                walletID.innerHTML = `Wallet connected: ${account}`;
        })
   } else {
       window.open("https://metamask.io/download/", "_blank");
   }
})

patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData.entries()));

    const inputField = document.getElementById('medical_history');
    const inputValue = inputField.value;

    const provider = new ethers.providers.JsonRpcProvider(HARDHAT_LOCALHOST_RPC_URL);
    const signer = ethers.Wallet.fromMnemonic(HARDHAT_DEFAULT_MNEMONIC)
        .connect(provider);

    const inputContract = new ethers.Contract(LOCALHOST_DAPP_ADDRESS, inputContractAbi, signer);
    const inputBytes = ethers.utils.toUtf8Bytes(inputValue);

    console.log(inputBytes);
});
