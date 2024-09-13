// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const TWO_MINUTES_IN_SECS = 2 * 60;
  const unlockTime = currentTimestampInSeconds + TWO_MINUTES_IN_SECS;

  const lockedAmount = hre.ethers.parseEther("2");clearImmediate
  

  const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.waitForDeployment();

  console.log(
    `Lock with 2 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );

  console.log(`Waiting for 2 minutes to expire...`);
  await new Promise((resolve) => setTimeout(resolve, TWO_MINUTES_IN_SECS * 1000));

  // Call the withdraw function after the lock period has passed
  try {
    console.log(`Calling withdraw function to retrieve locked funds...`);
    const withdrawTx = await lock.withdraw();
    await withdrawTx.wait(); // Wait for the transaction to be mined
    console.log(`Funds successfully withdrawn!`);
  } catch (error) {
    console.error(`Error while trying to withdraw:`, error);
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

