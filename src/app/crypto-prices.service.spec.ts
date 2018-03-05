import { TestBed, inject } from '@angular/core/testing';

import { CryptoPricesService } from './crypto-prices.service';

describe('CryptoPricesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoPricesService]
    });
  });

  it('should be created', inject([CryptoPricesService], (service: CryptoPricesService) => {
    expect(service).toBeTruthy();
  }));
});
