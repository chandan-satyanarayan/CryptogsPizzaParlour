const { expect } = require("chai");


/*
* 1. Deploy cryptogs contract
* 2. Assign tokens in mint to user account
* 4. Deploy Pizza Parlour contract - takes arguement as address from cryptogs
* 3. Call transferStackAndCall - calls ontransferstack internally - using the address from the pizza parlour contract deployment
* 4. onTransferstack throws an event which we should be able to see in truffle
*
* 1. Segreate run and tranfer events - call mint in both
* 2. Loop to get only events
* */

describe("Cryptogs", function() {
  it("Print transfer method events", async function() {

    const Cryptogs = await ethers.getContractFactory("Cryptogs");
    const cryptogs = await Cryptogs.deploy();

    await cryptogs.deployed();

    const PizzaParlor = await ethers.getContractFactory("PizzaParlor");
    const pizzaparlor = await PizzaParlor.deploy(cryptogs.address);

    await pizzaparlor.deployed();

    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000001", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000002", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000003", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000004", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000005", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

    const transfer = await cryptogs.transferStackAndCall(pizzaparlor.address,
        "1",
        "2",
        "3",
        "4",
        "5",
        "0x0000000000000000000000000000000000000000000000000000000000000001");
    const transferResult = await transfer.wait();
    const eventArray = transferResult.events.map(e => {
      return e.event
    })
    console.log(eventArray);
  });
});
describe("PizzaParlor", function() {
  it("Print pizza parlour run events", async function() {

    const Cryptogs = await ethers.getContractFactory("Cryptogs");
    const cryptogs = await Cryptogs.deploy();

    await cryptogs.deployed();

    const PizzaParlor = await ethers.getContractFactory("PizzaParlor");
    const pizzaparlor = await PizzaParlor.deploy(cryptogs.address);

    await pizzaparlor.deployed();

    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000001", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000002", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000003", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000004", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await cryptogs.mint("0x0000000000000000000000000000000000000000000000000000000000000005", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

    const transfer = await cryptogs.transferStackAndCall(pizzaparlor.address,
        "1",
        "2",
        "3",
        "4",
        "5",
        "0x0000000000000000000000000000000000000000000000000000000000000001");

    const pizzaParlorMain = await pizzaparlor.run();
    const result = await pizzaParlorMain.wait();
    const eventResultArray = result.events.map(e => {
      return e.event
    })
    console.log(eventResultArray);
  });
});
