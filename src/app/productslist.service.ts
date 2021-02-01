import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductslistService {

  public data_obj: any = [];
  constructor() { 
    fetch('../assets/data.json').then(res => res.json())
    .then(json => {
      // console.log(json);
      this.data_obj = json;
    });
    
   }

  public getDataList() {
    return this.data_obj;
  }
}
