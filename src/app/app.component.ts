import { Component } from '@angular/core';
import { Eth } from 'ethjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'something';

  eth = null;

  construct(){
    this.eth = new Eth(new Eth.HttpProvider('http://faucet.ropsten.be:3001/'));
  }
}
