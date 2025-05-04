"use client";
import React from "react";
import { useState } from "react";
import { getContract } from "@/utils/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploaderManager() {
  const [newUploader, setNewUploader] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleAddUploader = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.addUploader(newUploader);
      await tx.wait();
      setMessage(`✅ Uploader added: ${newUploader}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding uploader.");
    }
  };

  const handleRevokeUploader = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.revokeUploader(newUploader);
      await tx.wait();
      setMessage(`⚠️ Uploader revoked: ${newUploader}`);
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
          <Button onClick={handleRevokeUploader} variant="destructive">
            Revoke Uploader
          </Button>
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </CardContent>
    </Card>
  );
}
