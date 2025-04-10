const hre = require("hardhat");

async function main() {
    // Get the ContractFactory and deploy the contract
    const DocumentVerifier = await hre.ethers.getContractFactory("DocumentVerifier");
    const documentVerifier = await DocumentVerifier.deploy();

    console.log("DocumentVerifier deployed to:", documentVerifier.target);
}

// Handle errors and execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
