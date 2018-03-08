import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  isLoggedInRoute() {
    var router = this.router;

    return router.url == '/balances' ||
      router.url == '/transfer' ||
      router.url == '/add-token' ||
      router.url == '/txn-history' ||
      router.url == '/buy-token';
  }

}
