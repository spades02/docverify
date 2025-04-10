import { ethers } from "ethers";
import contractABI from "../artifacts/DocumentVerifier.json";

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export function getContract() {
    console.log(contractABI);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI.abi, signer);
}
