"use client";


import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json"
import { Upload, FileCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const generateFileHash = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
};

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

const handleUpload = async () => {
  console.log("Uploading triggered");
  setUploading(true);

  if (!file || !hash) {
    setStatus("Please select a file first.");
    console.log(status);
    return;
  }

  try {
    setStatus("Connecting to wallet...");
    console.log(status);

    if (!window.ethereum) {
      setStatus("MetaMask is not installed.");
      alert("Please install MetaMask to use this feature.");
      return;
    }

    // ✅ Request access to MetaMask
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts");

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // No need to `await` here
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    setStatus("Sending transaction...");
    console.log(status);

    const tx = await contract.uploadDocument(hash);
    await tx.wait();
    console.log("Transaction confirmed");

    setStatus("Document uploaded successfully!");
    console.log(status);
    console.log("Transaction hash:", tx.hash);
  } catch (error) {
    console.error(error);
    setStatus("Error uploading document. Check the console for more details.");
  }

  setTimeout(() => {
    setUploading(false);
  }, 2000);
};


  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Upload Document</h1>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-4">Drag and drop your document here or</p>
              <Input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
                <Button asChild variant="outline" className="cursor-pointer">
              <label htmlFor="file-upload">
                  Browse Files
              </label>
                </Button>
            </div>

            {file && (
              <div className="flex items-center gap-2 text-sm">
                <FileCheck className="w-4 h-4 text-green-500" />
                <span>{file.name}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="document-title">Document Title</Label>
              <Input id="document-title" placeholder="Enter document title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-description">Description (Optional)</Label>
              <Input id="document-description" placeholder="Enter document description" />
            </div>

            <Button
            onClick={handleUpload}
              className="w-full bg-blue-500 text-white hover:bg-blue-800"
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload to Blockchain"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}