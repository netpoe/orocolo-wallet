import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PRICES_URL = 'https://min-api.cryptocompare.com/data/price';

@Injectable()
export class CryptoPricesService {

  ethPrice: number;

  constructor(private http: HttpClient) { }

  getPriceEquivalence(fsym, tsyms = 'USD') {
    return this.http.get(PRICES_URL, {
      params: {
        fsym: fsym,
        tsyms: tsyms
      }
    })
    .toPromise()
    .then(function(response){
      console.log(response);
      return response[tsyms];
    }).catch(function(error){
      console.log(error);
    });
  }

  setEthPrice() {
    var comp = this;
    this.getPriceEquivalence('ETH').then(price => {
      comp.ethPrice = price;
    });
  }

}
