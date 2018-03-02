import { Injectable } from '@angular/core';
const crypto = require('crypto');
const Eth = require('ethers');
const utils = Eth.utils;

// const rpcServer = 'http://faucet.ropsten.be:3001/';
const rpcServer = 'http://127.0.0.1:7545';

@Injectable()
export class EthjsService {

  eth: any;

  constructor() {
    // this.eth = new Eth(new Eth.HttpProvider(rpcServer));
  }

  generatePrivateKey() {
    var hex = crypto.randomBytes(32).toString('hex');
    hex = utils.toUtf8Bytes(hex);
    return utils.keccak256(hex);
  }

  get() {
    return this.eth;
  }

}
