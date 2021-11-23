import Web3 from "web3";
import {contractAdr, infuraProvider} from "../../.env";
import * as keccak256 from "keccak256";

import * as contractABI from "../abi/NFCool.json";
import {AbiItem} from "web3-utils";

import * as util from "ethereumjs-util";

const web3 = new Web3(infuraProvider);

export const signatureToAddress = (signature: string): string => {
  const sig = util.fromRpcSig(signature);
  const publicKey = util.ecrecover(util.toBuffer(web3.utils.sha3("signature")), sig.v, sig.r, sig.s);
  return util.pubToAddress(publicKey).toString("hex");
};

export const isMinter = async (address: string): Promise<boolean> => {
  const contract = new web3.eth.Contract(contractABI.abi as AbiItem[], contractAdr);

  return await contract.methods.hasRole(keccak256("MINTER_ROLE"), address).call();
};
