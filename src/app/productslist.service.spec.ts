import { TestBed } from '@angular/core/testing';

import { ProductslistService } from './productslist.service';

describe('ProductslistService', () => {
  let service: ProductslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
