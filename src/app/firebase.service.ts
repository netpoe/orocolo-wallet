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
    return this.db
      .list(`${this.endpoints.tokensByAddress}/0x627306090abab3a6e1400e9345bc60c78a8bef57`)
      .push({
        address: address,
      });
  }

  listTokensByAddress(address: string) {
    return this.db
      .list(`${this.endpoints.tokensByAddress}/${address}`)
      .valueChanges();
  }

}
