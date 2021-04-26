// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
// const web3 = require("web3");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  //   const gasPrice = await hre.ethers
  //   console.log(`gasPrice is ${gasPrice}`);

  // We get the contract to deploy
    const Cryptogs = await hre.ethers.getContractFactory("Cryptogs");
    const cryptogs = await Cryptogs.deploy();

    await cryptogs.deployed();
    console.log("Cryptogs deployed to:", cryptogs.address);
    const PizzaParlor = await hre.ethers.getContractFactory("PizzaParlor");
    const pizzaparlor = await PizzaParlor.deploy(cryptogs.address);
    //
    await pizzaparlor.deployed();

    console.log("PizzaParlor deployed to:", pizzaparlor.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
