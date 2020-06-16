import { Component, OnInit } from '@angular/core';
import Pallete from "../constants/palette";
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import Product from '../models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  style: Object;
  sort: Object;
  btn: Object;
  text: Object;
  discBtn: Object;
  moreDetails: Object;
  category: string;
  loadItems: Observable<any[]>;
  products: Product[];
  loading = true;
  finalprice: number;
  constructor(private fbs: FirebaseService, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.style = {
      backgroundColor: Pallete.primaryColor,
      color: Pallete.accentColor
    };
    this.sort = {
      backgroundColor: Pallete.accentColor,
      color: Pallete.primaryColor
    };
    this.btn = {
      backgroundColor: Pallete.primaryColor,
      color: Pallete.textColor
    };
    this.discBtn = {
      backgroundColor: Pallete.primaryColor,
      color: Pallete.textColor
    };
    this.text = {
      color: Pallete.accentColor,
    };
    this.moreDetails = {
      backgroundColor: Pallete.textColor,
      color: Pallete.primaryColor
    };

    this.fbs.getProductsByCategory(this.route.snapshot.params.category, (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        this.products.push(temp);
      })

      console.log(this.products)
      this.loading = false;
    })
    document.getElementById("catBtn").style.display = "block";
  }

  allClick = () => {
    console.log("da5al hena");
    this.loading = true;
    this.fbs.getProductsByCategory(this.route.snapshot.params.category, (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        this.products.push(temp);
      })
      console.log("henaa")
      this.loading = false;
    })

  }
  lthClick = () => {
    console.log("da5al hena");
    this.loading = true;
    this.fbs.getProductsSortedByPrice(this.route.snapshot.params.category, (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        this.products.push(temp);
      })
      console.log("henaa", this.products)
      this.loading = false;
    })

  }
  htlClick = () => {
    console.log("da5al hena");
    this.loading = true;
    this.fbs.getProductsSortedByPriceInverted(this.route.snapshot.params.category, (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        this.products.push(temp);
      })
      console.log("henaa")
      this.loading = false;
    })
  }
  saleHtlClick = () => {
    console.log("da5al hena");
    this.loading = true;
    this.fbs.getProductsSortedBySale(this.route.snapshot.params.category, (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        this.products.push(temp);
      })
      console.log("henaa")
      this.loading = false;
    })
  }
}
