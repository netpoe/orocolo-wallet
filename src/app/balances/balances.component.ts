import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})

export class BalancesComponent implements OnInit {

  constructor(public eth: EthjsService, private router: Router) { }

  ngOnInit() {
    // if (this.eth.wallet == undefined || this.eth.provider == undefined) {
    //   return this.router.navigateByUrl('/login');
    // }

    // this.getBalance();
  }

  getBalance() {
    var eth = this.eth;

    eth.provider
      .getBalance(eth.wallet.address)
      .then(balance => {
        var etherString = eth.Utils.formatEther(balance);
        console.log(etherString);
      });
  }

}
