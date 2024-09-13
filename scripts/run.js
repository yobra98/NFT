// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");

async function main(){

  const deployNFTContract = await ethers.deployContract("BrianNFT");

  const elon = await deployNFTContract.waitForDeployment();

  console.log("BrianTheOriginalYobra contract address is:", await elon.getAddress());

  console.log("Minting NFT...");
  let txn = await elon.mintNFT();
  await txn.wait();
  console.log("Yayy.. NFT minted successfully!!!");
}

main().then(() => process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
})