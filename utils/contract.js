import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json";

const contractAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";

export function getContract() {
    console.log(contractABI);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI.abi, signer);
}
