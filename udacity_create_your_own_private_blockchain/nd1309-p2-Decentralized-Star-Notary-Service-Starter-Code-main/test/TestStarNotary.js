const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;
let tokenId;

contract("StarNotary", accs => {
  accounts = accs;
  owner = accounts[0];
});

it("can Create a Star", async () => {
  tokenId = 1;
  let instance = await StarNotary.deployed();
  await instance.createStar("Awesome Star!", tokenId, { from: accounts[0] });
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), "Awesome Star!");
});

it("lets user1 put up their star for sale", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let starId = 2;
  let starPrice = web3.utils.toWei(".01", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it("lets user1 get the funds after the sale", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 3;
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
  await instance.buyStar(starId, { from: user2, value: balance });
  let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
  let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
  let value2 = Number(balanceOfUser1AfterTransaction);
  assert.equal(value1, value2);
});

it("lets user2 buy a star, if it is put up for sale", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 4;
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance });
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it("lets user2 buy a star and decreases its balance in ether", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 5;
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
  const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
  const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
  let value =
    Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
  assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it("can add the star name and star symbol properly", async () => {
  const instance = await StarNotary.deployed();
  const user = accounts[0];
  const starId = 6;
  // 1. create a Star with different tokenId
  await instance.createStar(`star: ${starId} for user ${user}`, starId, {
    from: user,
  });
  //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
  assert.equal(await instance.symbol(), "NIT");
  assert.equal(await instance.name(), "NewIdeaToken");
});

it("lets 2 users exchange stars", async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const user2 = accounts[2];
  const starId1 = 7;
  const starId2 = 8;
  // 1. create 2 Stars with different tokenId
  await instance.createStar(`star: ${starId1} for user ${user1}`, starId1, {
    from: user1,
  });
  await instance.createStar(`star: ${starId2} for user ${user2}`, starId2, {
    from: user2,
  });
  assert.equal(await instance.ownerOf.call(starId1), user1);
  assert.equal(await instance.ownerOf.call(starId2), user2);
  // 2. Call the exchangeStars functions implemented in the Smart Contract
  await instance.exchangeStars(starId1, starId2, { from: user1 });
  // 3. Verify that the owners changed
  assert.equal(await instance.ownerOf.call(starId1), user2);
  assert.equal(await instance.ownerOf.call(starId2), user1);
});

it("lets a user transfer a star", async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const user2 = accounts[2];
  const starId = 9;
  // 1. create a Star with different tokenId
  await instance.createStar(`star: ${starId} for user ${user1}`, starId, {
    from: user1,
  });
  assert.equal(await instance.ownerOf.call(starId), user1);
  assert.notEqual(await instance.ownerOf.call(starId), user2);
  // 2. use the transferStar function implemented in the Smart Contract
  await instance.transferStar(user2, starId, { from: user1 });
  // 3. Verify the star owner changed.
  assert.notEqual(await instance.ownerOf.call(starId), user1);
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it("lookUptokenIdToStarInfo test", async () => {
  const instance = await StarNotary.deployed();
  const user1 = accounts[1];
  const starId = 10;
  const info = `star: ${starId} for user ${user1}`;
  // 1. create a Star with different tokenId
  await instance.createStar(info, starId, {
    from: user1,
  });
  // 2. Call your method lookUptokenIdToStarInfo
  // 3. Verify if you Star name is the same
  assert.equal(await instance.lookUptokenIdToStarInfo(starId), info);
});
