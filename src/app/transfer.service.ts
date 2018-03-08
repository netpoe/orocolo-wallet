import { Injectable } from '@angular/core';
import { Transfer } from './_models/transfer';
import { Token } from './_models/token';
import { EthjsService } from './ethjs.service';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';

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

  purchaseFailed: boolean = false;

  constructor(
    private eth: EthjsService,
    private router: Router,
    private firebase: FirebaseService
    ) { }

  private canMakeTransfer(_address?: string) {
    var address = _address || this.transfer.to;
    return this.transfer.amount > 0 &&
      web3.utils.isAddress(address);
  }

  private transferEth() {
    var amount = this.eth.Utils.parseEther(this.transfer.amount);
    var options = {
      gasLimit: this.transfer.gasLimit,
      gasPrice: this.eth.Utils.parseEther(this.transfer.gasPrice)
    }

    var service = this;

    this.eth.wallet.send(this.transfer.to, amount, options).then(tx => {
      console.log(tx);
      return service.firebase.addTxnByAddress(tx);
    }).then(response => {
      return service.router.navigateByUrl('txn-history');
    }).catch(error => {
      console.log(error);
      service.transferFailed = true;
    });
  }

  private transferToken() {
    var service = this;

    var contract = this.currentToken.contract;

    console.log(contract);

    contract.transfer(this.transfer.to, this.transfer.amount).then(tx => {
      console.log(tx);
      return service.firebase.addTxnByAddress(tx);
    }).then(response => {
      return service.router.navigateByUrl('txn-history');
    }).catch(error => {
      console.log(error);
    });
  }

  buyTokensFrom() {
    if (!this.canMakeTransfer(this.eth.wallet.address)) return false;

    var service = this;

    var contract = this.currentToken.contract;

    console.log(contract);

    var _amount = this.currentToken.ethPrice * this.transfer.amount;
    var _wei = this.eth.Utils.parseEther(_amount.toString());
    var _gasPrice = this.eth.Utils.parseEther(this.transfer.gasPrice.toString());
    var _gasLimit = this.transfer.gasLimit;

    contract.sellTo({
      gasPrice: _gasPrice,
      value: _wei,
    }).then(tx => {
      console.log(tx);
      return service.firebase.addTxnByAddress(tx);
    }).then(response => {
      return service.router.navigateByUrl('txn-history');
    }).catch(error => {
      console.log(error);
    });
  }

  transferFunds() {
    if (!this.canMakeTransfer()) return false;

    if (this.currentToken.symbol == 'ETH') {
      return this.transferEth();
    }

    return this.transferToken();
  }

}
