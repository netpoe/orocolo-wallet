import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { CryptoPricesService } from '../crypto-prices.service';
import { Router } from '@angular/router';
import { Transfer } from '../_models/transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit {

  transfer: Transfer = {
    from: '',
    to: '',
    amount: 0,
    gasLimit: 0,
    gasPrice: 4,
  };

  transferFailed: false;

  constructor(
    public eth: EthjsService,
    private router: Router,
    public prices: CryptoPricesService) { }

  ngOnInit() {
    this.transfer.from = this.eth.wallet.address;
    this.transfer.gasLimit = 21000;
    this.transfer.gasPrice = '0.000000004';
  }

  transferFunds() {
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

}







