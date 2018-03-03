import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onUploadError($evt) {
    console.log($evt);
  }

  onUploadSuccess($evt) {
    console.log($evt);
  }

  onFileSend(file, xhrObject, formData) {
    console.log(file, xhrObject, formData);

    var reader = new FileReader();

    reader.onload = (function(theFile) {
      return function(e) {
        var content = JSON.parse(e.target.result);
        content = JSON.parse(content);
        var privateKey = content.privateKey;
      };
    })(file);

    reader.readAsText(file);
  }

}
