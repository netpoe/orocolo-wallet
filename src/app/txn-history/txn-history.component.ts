import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { EthjsService } from '../ethjs.service';
import * as moment from 'moment';

@Component({
  selector: 'app-txn-history',
  templateUrl: './txn-history.component.html',
  styleUrls: ['./txn-history.component.css']
})

export class TxnHistoryComponent implements OnInit {

  moment: any;

  txns = [];

  constructor(
    private firebase: FirebaseService,
    public eth: EthjsService) {
    this.moment = moment();
  }

  ngOnInit() {
    this.getWalletTxns();
  }

  getWalletTxns() {
    var comp = this;

    this.firebase.listWalletTxns()
      .subscribe(txns => {
        console.log(txns);
        comp.txns = txns;
      });
  }

}
