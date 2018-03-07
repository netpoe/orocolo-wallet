import { Component, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';
import { EthjsService } from '../ethjs.service';

@Component({
  selector: 'app-buy-token',
  templateUrl: './buy-token.component.html',
  styleUrls: ['./buy-token.component.css']
})

export class BuyTokenComponent implements OnInit {

  constructor(
    public eth: EthjsService,
    public transferService: TransferService) { }

  ngOnInit() {
  }

}
