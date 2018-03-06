import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { Transfer } from '../_models/transfer';

const tokensByAddressPath = 'tokensByAddress';

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})

export class AddTokenComponent implements OnInit {

  tokenAddress: string;

  constructor(
    public eth: EthjsService,
    private router: Router,
    private firebase: FirebaseService) { }

  ngOnInit() {}

  addToken() {
    var comp = this;

    this.firebase
      .addTokenByAddress(this.tokenAddress).then(function() {
        comp.router.navigateByUrl('balances');
      }).catch(function(error) {
        console.error(error);
      });;
  }

}
