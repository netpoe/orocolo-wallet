import { Component } from '@angular/core';
import { EthjsService } from './ethjs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public eth: EthjsService, private router: Router) { }

  ngOnInit() {
    // if (this.eth.wallet == undefined || this.eth.provider == undefined) {
    //   return this.router.navigateByUrl('/login');
    // }
  }
}
