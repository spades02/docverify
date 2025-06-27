# 📄 DocVerify – Blockchain-Based Document Verification System

**DocVerify** is a full-stack decentralized application (dApp) built using **Next.js**, **Solidity**, and **Hardhat**. It enables secure, tamper-proof document verification through the power of blockchain.

---

## ✨ Features

- 🔐 Role-based access (Owner & Uploaders)  
- 📁 Upload documents with SHA-256 hash and store metadata on-chain  
- ✅ Verify documents instantly  
- 📦 Generate QR codes for quick verification  
- 🛡️ Immutable proof of authenticity  

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), TailwindCSS, ShadCN  
- **Smart Contract**: Solidity (via Hardhat)  
- **Blockchain Library**: Ethers.js  
- **QR Code Generation**: [`qrcode`](https://www.npmjs.com/package/qrcode)  
- **Wallet Integration**: MetaMask  

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/spades02/docverify.git
cd docverify

```

### 2. Install Dependencies

```bash
npm install
```
### 3. Start Local Hardhat Node

```bash
npx hardhat node
```
- This runs a local Ethereum network with test accounts.

### 4. Deploy Smart Contract

```bash

npx hardhat run scripts/deploy.js --network localhost
```
This will:

- Deploy the DocumentVerifier contract

- Store the contract address in config.json for frontend usage

### 5. Run the Frontend

```bash
npm run dev
```
- Visit the app at: http://localhost:3000

---

### 🧪 Test Accounts

Use the default accounts provided by Hardhat when running the local node. They include:

- Owner/deployer address

- Multiple test addresses with UPLOADER_ROLE granted or revoked

- Each account has 10,000 ETH for testing

---

### 📢 Want to Contribute?

- Pull requests are welcome!
- For major changes, please open an issue first to discuss what you'd like to improve.

### 📬 Contact

If you liked the project or want to collaborate, feel free to reach out or connect with me on [LinkedIn](https://www.linkedin.com/in/abdullah-develops).

