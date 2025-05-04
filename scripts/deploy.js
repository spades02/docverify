const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const DocVerify = await hre.ethers.getContractFactory("DocumentVerifier");
  const contract = await DocVerify.deploy(deployer.address); // Pass constructor arg here
  await contract.deployed();

  console.log("DocVerify deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
