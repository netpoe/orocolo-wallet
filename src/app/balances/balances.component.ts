import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { CryptoPricesService } from '../crypto-prices.service';
import { Router } from '@angular/router';
import { Token } from '../_models/token';
import { FirebaseService } from '../firebase.service';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})

export class BalancesComponent implements OnInit {

  tokens: Token[] = []

  constructor(
    public eth: EthjsService,
    private router: Router,
    public prices: CryptoPricesService,
    private firebase: FirebaseService,
    public transferService: TransferService) { }

  ngOnInit() {
    this.getEthBalance();

    this.eth.setERC20ABI();

    this.prices.setEthPrice().then(price => {
      this.getTokensByAddress();
    });
  }

  private setCurrentToken(data: Token) {
    this.transferService.currentToken = data;
  }

  private setToken(sym: string, data: Token) {
    this.tokens.push(data);
  }

  private getTokensByAddress() {
    var comp = this;

    this.firebase.listTokensByAddress(this.eth.wallet.address)
      .subscribe(tokens => {
        console.log(tokens);
        if (tokens) {
          Object.keys(tokens).forEach(token => {
            comp.setTokenDataFromContract(token);
          });
        }
      });
  }

  private setTokenDataFromContract(address: string) {
    var comp = this;

    var contract = comp.eth.getTokenContract(address);

    var tokenData = {} as Token;

    tokenData.address = address;
    tokenData.contract = contract;

    contract.symbol().then(symbol => {
      tokenData.symbol = symbol.valueOf()[0];
      return contract.balanceOf(comp.eth.wallet.address);
    }).then(balanceOf => {
      tokenData.amount = balanceOf.toString();
      return contract.name();
    }).then(name => {
      tokenData.name = name.valueOf()[0];
      comp.setToken(tokenData.symbol, tokenData);
      return contract.price();
    }).then(price => {
      var _price = price[0];
      tokenData.ethPrice = comp.eth.Utils.formatEther(_price);
      tokenData.usdPrice = comp.eth.Utils.formatEther(_price) * comp.prices.ethPrice;
      tokenData.totalUsd = tokenData.amount * tokenData.usdPrice;
      tokenData.totalEth = tokenData.amount * tokenData.ethPrice;
    }).catch(error => {
      console.log(error);
    });
  }

  selectToken(index: number) {
    this.transferService.currentToken = this.tokens[index];

    this.transferService.transfer.from = this.eth.wallet.address;
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
          var token: Token = {
            name: 'Ether',
            symbol: sym,
            usdPrice: price,
            amount: etherString,
            totalUsd: price * etherString
          };
          comp.setCurrentToken(token);
          comp.setToken(sym, token);
        });
      });
  }

}
