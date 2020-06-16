import { Component, OnInit } from '@angular/core';
import pallete from '../../constants/palette'
import {AngularFireDatabase} from '@angular/fire/database'
import { Observable } from 'rxjs';
import { ItemService } from "../../Item.service";
import { Item } from "../../Item";
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import Product from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  style: object;
  morebtn: object;
  accent: object;
  backGmain: Object;
  backGdiv: Object;
  accentBorder: Object;
  loadItems : Observable<any[]>;
  items:any;
  products: Product[];
  loading = true;
  param = 0;
  constructor(private fbs: FirebaseService, private route: ActivatedRoute){
    
    this.fbs.getProductsSortedBySaleFive("1", (actions) => {
      this.products = [];
      actions.forEach(action => {
        let temp = action.payload.val();
        temp.id = action.key;
        temp.link = `product/${temp.id}`;
        temp.discountImage = `../../../assets/img/disscount/${-temp.discount}.png`;
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
    this.morebtn = {
      color: pallete.accentColor,
      borderColor: pallete.accentColor
    }
  }

}
