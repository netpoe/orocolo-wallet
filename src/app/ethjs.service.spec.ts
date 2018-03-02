import { TestBed, inject } from '@angular/core/testing';

import { EthjsService } from './ethjs.service';

describe('EthjsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthjsService]
    });
  });

  it('should be created', inject([EthjsService], (service: EthjsService) => {
    expect(service).toBeTruthy();
  }));
});
