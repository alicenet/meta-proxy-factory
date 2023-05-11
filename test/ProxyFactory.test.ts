import { Contract } from "ethers";
import { ethers, expect } from "hardhat";
import * as helpers from "../src/index";
import { Factory } from "../src/proxyFactory";
type Mocks = {
  MockOne: Contract;
  MockOneAddress: any;
  MockTwo: Contract;
  MockTwoAddress: any;
  MockThree: Contract;
  MockThreeAddress: any;
};

describe("Proxy Factory Mock Test", async () => {
  it("Should Deploy Factory", async () => {
    await helpers.deployFactory();
  });
  it("Should Deploy Factory & Mock", async () => {
    let proxyFactory = await helpers.deployFactory();
    let NotExistent = helpers.getMetamorphicAddress(
      proxyFactory.address,
      "MockOne"
    );
    await helpers.deployUpgradeableWithFactory(
      proxyFactory,
      "Mock",
      "MockOne",
      ["foo", 1337],
      [1, NotExistent, NotExistent]
    );
  });
  it("Should Deploy Factory & 3 Mocks (connected addresses)", async () => {
    await deployConnected();
  });
  it("should deploy factory", async () => {
    const deployer = await new Factory(ethers);
    expect(await deployer.isInitialized());
  });
});

export const deployConnected = async (): Promise<Mocks> => {
  // deploy the factory proxy
  let proxyFactory = await helpers.deployFactory();

  // calculate the addresses of the contracts we are going to deploy
  let MockOneAddress = helpers.getMetamorphicAddress(
    proxyFactory.address,
    "MockOne"
  );
  let MockTwoAddress = helpers.getMetamorphicAddress(
    proxyFactory.address,
    "MockTwo"
  );
  let MockThreeAddress = helpers.getMetamorphicAddress(
    proxyFactory.address,
    "MockThree"
  );

  const MockOne = await helpers.deployUpgradeableWithFactory(
    proxyFactory,
    "Mock",
    "MockOne",
    ["foo", 1337],
    [1, MockTwoAddress, MockThreeAddress]
  );

  const MockTwo = await helpers.deployUpgradeableWithFactory(
    proxyFactory,
    "Mock",
    "MockTwo",
    ["bar", 1985],
    [1, MockOneAddress, MockThreeAddress]
  );
  const MockThree = await helpers.deployUpgradeableWithFactory(
    proxyFactory,
    "Mock",
    "MockThree",
    ["baz", 42],
    [1, MockOneAddress, MockTwoAddress]
  );

  let mocks = {
    MockOne,
    MockOneAddress,
    MockTwo,
    MockTwoAddress,
    MockThree,
    MockThreeAddress,
  };
  return mocks;
};
