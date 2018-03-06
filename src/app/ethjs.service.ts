import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  ERC20ABI: any;

  constructor(
    private http: HttpClient) {
    this.Eth = Eth;
    this.Wallet = Wallet;
    this.Contract = Contract;
    this.Providers = Providers;
    this.Utils = Utils;
  }

  getTokenContract(address: string) {
    return new this.Contract(address, this.ERC20ABI, this.wallet);
  }

  setERC20ABI() {
    var service = this;

    this.http.get('assets/json/ERC20.abi.json')
      .toPromise()
      .then(ABI => {
        service.ERC20ABI = ABI;
      }).catch(error => {
        console.log(error);
      });
  }
}
