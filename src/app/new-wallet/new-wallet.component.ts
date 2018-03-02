import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.css']
})

export class NewWalletComponent implements OnInit {

  privateKeyFile: string;

  constructor(private eth: EthjsService) {

  }

  ngOnInit() {
    // this.eth.get().accounts().then(accounts => {
    //   console.log(accounts);
    // })
  }

  generatePrivateKey() {
    var privateKey = this.eth.generatePrivateKey();

    var keyObj = {
      privateKey: privateKey,
    };

    this.privateKeyFile = JSON.stringify(keyObj);

    // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keyObj));
    // var dlAnchorElem = document.getElementById('downloadAnchorElem');
    // dlAnchorElem.setAttribute("href", dataStr);
    // dlAnchorElem.setAttribute("download", "scene.json");
  }
}
