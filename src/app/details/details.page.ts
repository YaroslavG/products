import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsoleReporter } from 'jasmine';
import { ProductslistService } from '../productslist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})


export class DetailsPage {
  
  public json_data: any = [];
  public detail_data: any = [];
  public amount_price: string = "";
  public quantity: string = "";

  constructor(private activatedRoute: ActivatedRoute, private router: ActivatedRoute, private productList: ProductslistService) {
   }

   ionViewWillEnter() {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.sku) {
        console.log(JSON.parse(params.sku));
        this.json_data = this.productList.getDataList();
       this.detail_data = this.getByValue(this.json_data,params.sku);
      //  console.log(this.detail_data);
      }
    })
  }

  getByValue(arr, value) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {
      
      if (arr[i].sku == value) return arr[i];
    }
  }

  CalculateQuantity(val) {
    this.amount_price = val;
    this.quantity = (val/this.detail_data.price).toFixed(2);
  }

  CalculateTotalPrice(val) {
    this.quantity = val;
    this.amount_price = (val*this.detail_data.price).toFixed(2);
  }

}