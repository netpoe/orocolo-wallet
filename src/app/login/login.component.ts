import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { Router } from '@angular/router';
import { Wallet } from '../_models/wallet';
import { environment } from '../../environments/environment';

const JSONRPC_PROVIDER_URL = 'http://localhost:7545';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  wallet: Wallet = {
    privateKey: '',
    address: '',
    mnemonic: '',
    path: '',
  };

  constructor(private eth: EthjsService, private router: Router) {}

  ngOnInit() {
  }

  private setWalletData(data) {
    this.wallet = {
      privateKey: data.privateKey || '',
      mnemonic: data.mnemonic || '',
      path: data.mnemonic || '',
      address: data.address || '',
    };
  }

  private unsetWalletData() {
    this.wallet = {
      privateKey: '',
      mnemonic: '',
      path: '',
      address: '',
    };
  }

  switchTab($evt, id) {
    var classes = ['.tab-pane', '.tab'];

    classes.forEach(selector => {
      Array.from(document
        .querySelectorAll(selector))
        .forEach(item => {
          item.classList.remove('active')
        });
    });

    $evt.target.classList.add('active');
    document.getElementById(id).classList.add('active');
  }

  unlockFromMnemonic($evt) {
    if (this.wallet.mnemonic.split(' ').length != 12) {
      return this.unsetWalletData();
    }

    try {
      this.eth.wallet = this.eth.Wallet.fromMnemonic(this.wallet.mnemonic);
      return this.setWalletData(this.eth.wallet);
    } catch {
      return this.unsetWalletData();
    }
  }

  private login() {
    if (this.eth.wallet.address === this.wallet.address
        && this.eth.wallet.privateKey === this.wallet.privateKey) {

      return this.router.navigateByUrl('balances');
    }

    console.log('file corrupted');
  }

  private unlockJsonRpcWallet() {
    this.eth.provider = new this.eth.Providers.JsonRpcProvider(JSONRPC_PROVIDER_URL);

    this.eth.wallet = new this.eth.Wallet(this.wallet.privateKey, this.eth.provider);

    return this.login();
  }

  private unlockRopstenWallet() {
    var network = this.eth.Providers.networks.ropsten;

    this.eth.provider = new this.eth.Providers.EtherscanProvider(network);

    this.eth.wallet = new this.eth.Wallet(this.wallet.privateKey, this.eth.provider);

    return this.login();
  }

  unlockWallet() {
    if (environment.local) {
      return this.unlockJsonRpcWallet();
    } else if (environment.development) {
      return this.unlockRopstenWallet();
    }
  }

  onUploadError($evt) {
    console.log($evt);
  }

  onUploadSuccess($evt) {
    console.log($evt);
  }

  onFileAdded(file) {
    var reader = new FileReader();

    var content;

    reader.onload = (function(theFile, comp) {
      return function(e) {
        content = JSON.parse(e.target.result);
        content = JSON.parse(content);
        comp.setWalletData(content);
      };
    })(file, this);

    reader.readAsText(file);
  }

}
