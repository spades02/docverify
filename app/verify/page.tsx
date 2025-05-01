"use client";

import { useState } from "react";
import { Upload, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import contractABI from "@/artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json"; // Put ABI file here

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function VerifyPage() {

const [file, setFile] = useState<File | null>(null);
const [hash, setHash] = useState<string>("");
const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

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

const generateFileHash = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
};

const handleVerify = async () => {
  if (!file) return;

  try {
    // Connect to Ethereum provider (e.g., MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

    const tx = await contract.verifyDocument(hash);
    const receipt = await tx.wait();

    const event = receipt.events?.find((e: ethers.Event) => e.event === "DocumentVerified");
    if (event && event.args && event.args.isValid) {
      setVerificationStatus("✅ Document verified successfully!");
    } else {
      setVerificationStatus("❌ Document not found.");
    }
  } catch (error) {
    console.error("Verification error:", error);
    setVerificationStatus("⚠️ Error verifying document.");
  }
};

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Verify Document</h1>
        
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

            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={!file}
            >
              Verify Document
            </Button>

            {verificationStatus && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                {verificationStatus}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}