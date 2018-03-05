import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { CryptoPricesService } from '../crypto-prices.service';
import { Router } from '@angular/router';
import { Token } from '../_models/token';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})

export class BalancesComponent implements OnInit {

  currentToken: Token = {
    name: '',
    symbol: '',
    price: 0,
    amount: 0,
    usd: 0,
  }

  tokens: Token[] = []

  ERC20ABI: any;

  constructor(
    public eth: EthjsService,
    private router: Router,
    private http: HttpClient,
    public prices: CryptoPricesService,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.getEthBalance();

    this.setERC20ABI();

    this.prices.setEthPrice();

    this.getTokensByAddress();
  }

  private setERC20ABI() {
    var comp = this;

    this.http.get('assets/json/ERC20.abi.json')
      .toPromise()
      .then(ABI => {
        comp.ERC20ABI = ABI;
      }).catch(error => {
        console.log(error);
      });
  }

  private setCurrentToken(data: Token) {
    this.currentToken = data;
  }

  private setToken(sym: string, data: Token) {
    this.tokens.push(data);
    console.log(this.tokens);
  }

  private getTokensByAddress() {
    var comp = this;

    this.firebase.listTokensByAddress(this.eth.wallet.address)
      .subscribe(tokens => {
        console.log(tokens);
        tokens.forEach(token => {
          console.log(token);
          comp.setTokenDataFromContract(token.address);
        });
      });
  }

  private setTokenDataFromContract(address: string) {
    var contract = this.getTokenContract(address);
    console.log(contract);

    var tokenData: Token{};

    contract.symbol().then(symbol => {
      console.log(symbol.valueOf());
      tokenData.symbol = symbol.valueOf()[0];
      return contract.balanceOf(comp.eth.wallet.address);
    }).then(balanceOf => {
      console.log(balanceOf.toString());
      tokenData.amount = balanceOf.toString();
      return contract.name();
    }).then(name => {
      console.log(name.valueOf());
      tokenData.name = name.valueOf()[0];
      comp.setToken(tokenData.symbol, tokenData);
    }).catch(error => {
      console.log(error);
    });
  }

  private getTokenContract(address: string) {
    return new this.eth.Contract(address, this.ERC20ABI, this.eth.wallet);
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
