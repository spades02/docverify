"use client";

import { useEffect, useState } from "react";
import { getContract } from "@/utils/contract";

export default function useUserRoles() {
  const [account, setAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isUploader, setIsUploader] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const currentAccount = accounts[0];
    setAccount(currentAccount);
    setWalletConnected(true);

    const contract = getContract();

    // Check owner
    const owner = await contract.owner();
    setIsOwner(currentAccount.toLowerCase() === owner.toLowerCase());

    // Check uploader role
    const uploaderRole = await contract.UPLOADER_ROLE();
    const hasUploader = await contract.hasRole(uploaderRole, currentAccount);
    setIsUploader(hasUploader);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const currentAccount = accounts[0];
        setAccount(currentAccount);
        setWalletConnected(true);

        const contract = getContract();

        // Check owner
        const owner = await contract.owner();
        setIsOwner(currentAccount.toLowerCase() === owner.toLowerCase());

        // Check uploader role
        const uploaderRole = await contract.UPLOADER_ROLE();
        const hasUploader = await contract.hasRole(uploaderRole, currentAccount);
        setIsUploader(hasUploader);
      }
    };

    checkConnection();
  }, []);

  return {
    account,
    walletConnected,
    isOwner,
    isUploader,
    connectWallet,
  };
}
