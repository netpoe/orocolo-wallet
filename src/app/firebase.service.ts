import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EthjsService } from './ethjs.service';

@Injectable()
export class FirebaseService {

  endpoints = {
    tokensByAddress: 'tokensByAddress',
  }

  constructor(
    private db: AngularFireDatabase,
    private eth: EthjsService) { }

  addTokenByAddress(address: string) {
    var token = {};
    token[address] = {
      address: address
    };

    return this.db
      .object(`${this.endpoints.tokensByAddress}/${this.eth.wallet.address}`)
      .update(token);
  }

  listTokensByAddress(address: string) {
    return this.db
      .object(`${this.endpoints.tokensByAddress}/${address}`)
      .valueChanges();
  }

}
