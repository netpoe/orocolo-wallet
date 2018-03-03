import { Injectable } from '@angular/core';
const crypto = require('crypto');
const Eth = require('ethers');
const Wallet = Eth.Wallet;
const Utils = Eth.utils;
const Providers = Eth.providers;

// const rpcServer = 'http://faucet.ropsten.be:3001/';
const rpcServer = 'http://127.0.0.1:7545';

@Injectable()
export class EthjsService {

  Eth: any;
  Wallet: any;
  Providers: any;
  Utils: any;

  wallet: any;
  provider: any;

  constructor() {
    this.Eth = Eth;
    this.Wallet = Wallet;
    this.Providers = Providers;
    this.Utils = Utils;
  }
}
