import { Component, OnInit } from '@angular/core';
import { EthjsService } from '../ethjs.service';
import { TransferService } from '../transfer.service';
import { CryptoPricesService } from '../crypto-prices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit {

  constructor(
    public eth: EthjsService,
    private router: Router,
    public prices: CryptoPricesService,
    public transferService: TransferService
    ) { }

  ngOnInit() {}

}







