import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

import {combineLatest, Observable, of} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {FormControl} from '@angular/forms';

export interface ProductList {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public products: Observable<ProductList[]>;
  public filteredList: Observable<ProductList[]>;
  public filter: FormControl;
  public filter$: Observable<string>;
  public search_word: string = "";

  constructor(private storage: Storage, private router: Router) {

    this.filter = new FormControl('');
   
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    fetch('../assets/data.json').then(res => res.json())
    .then(json => {
      // console.log(json);

    this.products = of(json);
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredList = combineLatest(this.products, this.filter$).pipe(
      map(([products, filterString]) => products.filter(products => products.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );

      this.storage.get('search_word').then((val) => {
        // console.log('storage value is ', val);
        this.search_word = val;
      });

    });
  }

  FilterByName(ev: any) {
    const val = ev;
    if (val && val.trim() != '') {
          this.storage.set('search_word', val);
    }
  }

  openDetails(product: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(product)
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
}