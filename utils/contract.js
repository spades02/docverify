import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json";
import contractConfig from "@/app/config.json";

const contractAddress = contractConfig[31337].documentVerifier.address;

export function getContract() {
    console.log(contractABI);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI.abi, signer);
}
