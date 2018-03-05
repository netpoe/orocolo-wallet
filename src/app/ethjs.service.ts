import { Injectable } from '@angular/core';
const crypto = require('crypto');
const Eth = require('ethers');
const Wallet = Eth.Wallet;
const Contract = Eth.Contract;
const Utils = Eth.utils;
const Providers = Eth.providers;

// const rpcServer = 'http://faucet.ropsten.be:3001/';

@Injectable()
export class EthjsService {

  Eth: any;
  Wallet: any;
  Providers: any;
  Utils: any;
  Contract: any;

  wallet: any;
  provider: any;

  constructor() {
    this.Eth = Eth;
    this.Wallet = Wallet;
    this.Contract = Contract;
    this.Providers = Providers;
    this.Utils = Utils;
  }
}
