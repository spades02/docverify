// hooks/useBlockchain.ts
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "@/artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json";
import contractConfig from "@/app/config.json";

export function useBlockchain() {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isUploader, setIsUploader] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const network = await provider.getNetwork();
        const chainId = String(network.chainId) as keyof typeof contractConfig;
        const contractAddress = contractConfig[chainId].documentVerifier.address;
        const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
        setContract(contractInstance);

        const UPLOADER_ROLE = await contractInstance.UPLOADER_ROLE();
const uploaderStatus = await contractInstance.hasRole(UPLOADER_ROLE, address); // ✅ correct

        setIsUploader(uploaderStatus);
      } catch (err) {
        console.error("Blockchain init failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { contract, account, isUploader, loading };
}
