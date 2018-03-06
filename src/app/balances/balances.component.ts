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

    this.prices.setEthPrice();

    this.getTokensByAddress();
  }

  private setCurrentToken(data: Token) {
    this.transferService.currentToken = data;
  }

  private setToken(sym: string, data: Token) {
    this.tokens.push(data);
    console.log(this.tokens);
  }

  private getTokensByAddress() {
    var comp = this;

    this.firebase.listTokensByAddress(this.eth.wallet.address)
      .subscribe(tokens => {
        console.log(Object.keys(tokens));
        Object.keys(tokens).forEach(token => {
          console.log(token);
          comp.setTokenDataFromContract(token);
        });
      });
  }

  private setTokenDataFromContract(address: string) {
    var comp = this;

    var contract = comp.eth.getTokenContract(address);
    console.log(contract);

    var tokenData = {} as Token;

    tokenData.address = address;
    tokenData.contract = contract;

    contract.symbol().then(symbol => {
      console.log(symbol.valueOf());
      tokenData.symbol = symbol.valueOf()[0];
      return contract.balanceOf(comp.eth.wallet.address);
    }).then(balanceOf => {
      console.log(balanceOf.toString());
      tokenData.amount = balanceOf.toString();
      tokenData.price = 0.5;
      tokenData.usd = tokenData.price * tokenData.amount;
      tokenData.eth = tokenData.usd / comp.prices.ethPrice;
      return contract.name();
    }).then(name => {
      console.log(name.valueOf());
      tokenData.name = name.valueOf()[0];
      comp.setToken(tokenData.symbol, tokenData);
    }).catch(error => {
      console.log(error);
    });
  }

  selectToken(index: number) {
    console.log(index);
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
            price: price,
            amount: etherString,
            usd: price * etherString
          };
          comp.setCurrentToken(token);
          comp.setToken(sym, token);
        });
      });
  }

}
