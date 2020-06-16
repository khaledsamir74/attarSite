import { Component, OnInit } from '@angular/core';
import pallete from '../../constants/palette'
import {AngularFireDatabase} from '@angular/fire/database'
import { Observable } from 'rxjs';
import { ItemService } from "../../Item.service";
import { Item } from "../../Item";
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import Product from 'src/app/models/Product';

@Component({
  selector: 'app-discount',
  templateUrl:'./discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  style: object;
  accent: object;
  backGmain: Object;
  backGdiv: Object;
  accentBorder: Object;
  loadItems : Observable<any[]>;
  items:any;
  products: Product[];
  loading = true;
  
  constructor(fbs: FirebaseService){
    fbs.getProductsOnSale((actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
        temp.salePrice =parseInt((temp.price * (1 + (temp.discount / 100))).toString());
        this.products.push(temp);
      })

      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.style = {
      color: pallete.primaryColor,
    }
    this.accent = {
      color: pallete.accentColor,
    }
    this.backGmain = {
      backgroundColor: pallete.primaryColor,
    }
    this.backGdiv = {
      backgroundColor: pallete.accentColor,
    }
    this.accentBorder = {
      borderColor: pallete.accentColor,
    }
  }

}