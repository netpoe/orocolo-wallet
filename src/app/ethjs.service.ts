import { Injectable } from '@angular/core';
const crypto = require('crypto');
const Eth = require('ethers');
const Wallet = Eth.Wallet;
const utils = Eth.utils;
const providers = Eth.providers;

// const rpcServer = 'http://faucet.ropsten.be:3001/';
const rpcServer = 'http://127.0.0.1:7545';

@Injectable()
export class EthjsService {

  Eth: any;
  Wallet: any;

  constructor() {
    this.Eth = Eth;
    this.Wallet = Wallet;
  }
}
