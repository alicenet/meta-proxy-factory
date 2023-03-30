import { Contract } from "ethers";
type Mocks = {
    MockOne: Contract;
    MockOneAddress: any;
    MockTwo: Contract;
    MockTwoAddress: any;
    MockThree: Contract;
    MockThreeAddress: any;
};
export declare const deployConnected: () => Promise<Mocks>;
export {};
