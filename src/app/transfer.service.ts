import { Injectable } from '@angular/core';
import { Transfer } from './_models/transfer';
import { Token } from './_models/token';
import { EthjsService } from './ethjs.service';

let Web3 = require('web3');
let web3 = new Web3();

@Injectable()
export class TransferService {

  currentToken = {} as Token

  transfer: Transfer = {
    from: '',
    to: '',
    amount: 0,
    gasLimit: 21000,
    gasPrice: '0.000000004',
  }

  transferFailed: boolean = false;

  constructor(
    private eth: EthjsService
    ) { }

  private transferEth() {
    var amount = this.eth.Utils.parseEther(this.transfer.amount);
    var options = {
      gasLimit: this.transfer.gasLimit,
      gasPrice: this.eth.Utils.parseEther(this.transfer.gasPrice)
    }

    this.eth.wallet.send(this.transfer.to, amount, options).then(tx => {
      console.log(tx);
    }).catch(error => {
      console.log(error);
      this.transferFailed = true;
    });
  }

  private transferToken() {
    var service = this;

    var contract = this.currentToken.contract;

    console.log(contract);

    if (this.transfer.amount > 0 && web3.utils.isAddress(this.transfer.to)) {
      contract.transfer(this.transfer.to, this.transfer.amount).then(tx => {
        console.log(tx);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  transferFunds() {
    if (this.currentToken.symbol == 'ETH') {
      return this.transferEth();
    }

    return this.transferToken();
  }

}