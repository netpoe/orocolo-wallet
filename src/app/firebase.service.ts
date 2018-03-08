import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EthjsService } from './ethjs.service';
import * as moment from 'moment';

@Injectable()
export class FirebaseService {

  moment: any;

  endpoints = {
    tokensByAddress: 'tokensByAddress',
    txnsByAddress: 'txnsByAddress',
  }

  constructor(
    private db: AngularFireDatabase,
    private eth: EthjsService) {
    this.moment = moment();
  }

  addTokenByAddress(address: string) {
    var token = {};
    token[address] = {
      address: address
    };

    return this.db
      .object(`${this.endpoints.tokensByAddress}/${this.eth.wallet.address}`)
      .update(token);
  }

  addTxnByAddress(_txn) {
    var txn = {
      datetime: this.moment.format(),
      hash: _txn.hash,
      from: _txn.from,
      to: _txn.to,
    };

    return this.db
      .list(`${this.endpoints.txnsByAddress}/${this.eth.wallet.address}`)
      .push(txn);
  }

  listWalletTxns() {
    return this.db
      .list(`${this.endpoints.txnsByAddress}/${this.eth.wallet.address}`)
      .valueChanges();
  }

  listTokensByAddress(address: string) {
    return this.db
      .object(`${this.endpoints.tokensByAddress}/${address}`)
      .valueChanges();
  }

}
