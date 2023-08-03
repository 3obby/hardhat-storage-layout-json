import { extendEnvironment } from "hardhat/config";
import { ethers } from "ethers";

// We're extending the Hardhat Runtime Environment, adding our hashing functionality
import "./type-extensions";

function getHash(input: string) {
  const message = ethers.toUtf8Bytes(input);
  const messageHash = ethers.keccak256(message);

  // Convert the message hash (hex string) to BigInt, subtract 1, and convert back to hex string
  const hashMinusOneBigInt = ethers.toBigInt(messageHash) - 1n;
  const hashMinusOneHex = ethers.toBeHex(hashMinusOneBigInt);

  return hashMinusOneHex;
}

extendEnvironment((hre) => {
  hre.getHash = getHash;
});
