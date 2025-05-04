"use client";
import { useEffect, useState } from "react";
import { getContract } from "@/utils/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ethers } from "ethers";

export default function UploaderManager() {
  const [newUploader, setNewUploader] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [uploaders, setUploaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const knownAccounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
    "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
    "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
    "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  ];
  

  useEffect(() => {
    const fetchUploaders = async () => {
      try {
        const contract = await getContract();
        const uploaderList: string[] = [];

        for (const address of knownAccounts) {
          const isUploader: boolean = await contract.hasRole(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UPLOADER_ROLE")),
            address
          );
          if (isUploader) uploaderList.push(address);
        }

        setUploaders(uploaderList);
      } catch (err) {
        console.error("Error fetching uploaders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUploaders();
  }, [message]); // Refresh list after action

  const handleAddUploader = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.addUploader(newUploader);
      await tx.wait();
      setMessage(`✅ Uploader added: ${newUploader}`);
      setNewUploader("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding uploader.");
    }
  };

  const handleRevokeUploader = async (address: string) => {
    try {
      const contract = await getContract();
      const tx = await contract.revokeUploader(address);
      await tx.wait();
      setMessage(`⚠️ Uploader revoked: ${address}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error revoking uploader.");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-lg">Uploader Role Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter wallet address"
          value={newUploader}
          onChange={(e) => setNewUploader(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={handleAddUploader} variant="default">
            Add Uploader
          </Button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading uploaders...</p>
        ) : uploaders.length > 0 ? (
          <div className="space-y-2">
            <p className="font-medium">Current Uploaders:</p>
            {uploaders.map((uploader) => (
              <div
                key={uploader}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span className="text-xs">{`${uploader.slice(0, 8)}...${uploader.slice(-6)}`}</span>
                <Button
                  onClick={() => handleRevokeUploader(uploader)}
                  variant="destructive"
                  size="sm"
                >
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No uploaders found.</p>
        )}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </CardContent>
    </Card>
  );
}
