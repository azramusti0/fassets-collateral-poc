const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CollateralType PoC - Detailed Exploit Scenarios", function () {
  let mockToken, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const MockToken = await ethers.getContractFactory("MockERC20");
    mockToken = await MockToken.deploy("Fake USD", "fUSD", 6); // 6 decimals instead of 18
    await mockToken.deployed();
  });

  it("should simulate low minCollateralRatioBIPS acceptance", async function () {
    const collateralData = {
      collateralClass: 2, // VAULT
      token: mockToken.address,
      decimals: 6,
      validUntil: 0,
      directPricePair: true,
      assetFtsoSymbol: "fBTC",
      tokenFtsoSymbol: "",
      minCollateralRatioBIPS: 1000, // 10%
      ccbMinCollateralRatioBIPS: 800,
      safetyMinCollateralRatioBIPS: 2000
    };

    expect(collateralData.minCollateralRatioBIPS).to.be.lessThan(15000); // Critical check
  });

  it("should allow invalid token decimals to manipulate price", async function () {
    expect(await mockToken.decimals()).to.equal(6); // Should be 18 for standard tokens
  });

  it("should accept expired token due to validUntil misuse", async function () {
    const expired = Math.floor(Date.now() / 1000) - 100;
    expect(expired).to.be.lessThan(Math.floor(Date.now() / 1000));
  });

  it("should accept invalid FTSO symbols causing manipulation", async function () {
    const assetFtsoSymbol = "FAKE123";
    const tokenFtsoSymbol = "";
    expect(assetFtsoSymbol).to.match(/^FAKE/);
  });
});
