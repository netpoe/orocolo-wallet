import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { CryptoPricesService } from '../crypto-prices.service';
import { Router } from '@angular/router';
import { Token } from '../_models/token';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})

export class BalancesComponent implements OnInit {

  token: Token = {
    name: '',
    symbol: '',
    value: 0,
    amount: 0,
    usd: 0,
  }

  constructor(
    public eth: EthjsService,
    private router: Router,
    public prices: CryptoPricesService) { }

  ngOnInit() {
    this.getEthBalance();

    this.prices.setEthPrice();
  }

  private setToken(data) {
    this.token = data;
  }

  getEthBalance() {
    var eth = this.eth;
    var prices = this.prices;
    var comp = this;

    eth.provider
      .getBalance(eth.wallet.address)
      .then(balance => {
        var etherString = eth.Utils.formatEther(balance);
        var sym = 'ETH';
        var usd = prices.getPriceEquivalence(sym).then(price => {
          comp.setToken({
            name: 'Ether',
            symbol: sym,
            value: 0,
            amount: etherString,
            usd: price * etherString
          });
        });
      });
  }

}
