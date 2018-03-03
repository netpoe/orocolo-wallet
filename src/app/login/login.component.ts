import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  privateKey: string;

  mnemonic: string;

  address: string;

  constructor() { }

  ngOnInit() {
  }

  onUploadError($evt) {
    console.log($evt);
  }

  onUploadSuccess($evt) {
    console.log($evt);
  }

  onFileAdded(file) {
    console.log(file);
    var reader = new FileReader();

    var content;

    reader.onload = (function(theFile, comp) {
      return function(e) {
        content = JSON.parse(e.target.result);
        content = JSON.parse(content);
        console.log(content);
        comp.privateKey = content.privateKey;
        comp.mnemonic = content.mnemonic || '';
        comp.address = content.address || '';
      };
    })(file, this);

    reader.readAsText(file);
  }

}
