import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})


export class DetailsPage implements OnInit {
  
  public detail_data: any = [];
  public amount_price: string = "";
  public quantity: string = "";

  constructor(private activatedRoute: ActivatedRoute, private router: ActivatedRoute) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        //store the temp in data
        this.detail_data = JSON.parse(params.special);
        // console.log(this.detail_data);
      }
    })
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