import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.css']
})

export class NewWalletComponent implements OnInit {

  privateKeyFile: string;

  constructor(private eth: EthjsService) {}

  ngOnInit() {}

  downloadKeyFile() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.privateKeyFile));
    var dlAnchorElem = document.getElementById('download-key-file');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "orocolo-key.json");
    dlAnchorElem.click();
  }

  generateWallet() {
    var wallet = this.eth.Wallet.createRandom();

    var walletObj = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      path: wallet.path,
      mnemonic: wallet.mnemonic,
    };

    this.privateKeyFile = JSON.stringify(walletObj);
  }
}
