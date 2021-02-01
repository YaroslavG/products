import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
       console.log(this.detail_data);
      }
    })
  }

  getByValue(arr, value) {
    console.log(arr);
    for (var i=0, iLen=arr.length; i<iLen; i++) {
      
      if (arr[i].sku == value) return arr[i];
    }
  }

  CalculateQuantity(amount) {
    this.amount_price = amount;
    this.quantity = (amount/this.detail_data.price).toFixed(2);
  }

  CalculateTotalPrice(quantity) {
    this.quantity = quantity;
    this.amount_price = (quantity*this.detail_data.price).toFixed(2);
  }

}