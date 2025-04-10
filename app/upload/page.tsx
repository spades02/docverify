'use client';
import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [hash, setHash] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    // Generate the file hash using SubtleCrypto API (built-in browser functionality)
const generateFileHash = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
};

    // Handle file upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const uploadedFile = e.target.files[0];
            setFile(uploadedFile);
    
            // Generate the file's hash using Web Crypto API
            const fileHash = await generateFileHash(uploadedFile);
            console.log(fileHash);
            setHash(fileHash);
        }
    };

    // Interact with the smart contract
    const uploadDocument = async () => {
        if (!file || !hash) {
            setStatus("Please select a file first.");
            return;
        }
    
        try {
            setStatus("Connecting to wallet...");
            if (!window.ethereum) {
                setStatus("MetaMask is not installed.");
                return;
            }
    
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    
            setStatus("Sending transaction...");
            const tx = await contract.uploadDocument(hash);
            await tx.wait();  // Wait for the transaction to be mined
    
            setStatus("Document uploaded successfully!");
        } catch (error) {
            console.error(error);
            setStatus("Error uploading document. Check the console for more details.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
            <h1>Upload Document</h1>
            <input type="file" onChange={handleFileChange} />
            {hash && <p>File Hash: {hash}</p>}
            <button onClick={uploadDocument} style={{ margin: "10px", padding: "10px 20px" }}>
                Upload
            </button>
            <p>{status}</p>
        </div>
    );
}
