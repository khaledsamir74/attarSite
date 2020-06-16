import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Pallete from "../../constants/palette";
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-prductdetails',
  templateUrl: './prductdetails.component.html',
  styleUrls: ['./prductdetails.component.css']
})
export class PrductdetailsComponent implements OnInit {
  style: Object;
  product: any = {};
  saleprice: number;
  loading = true;
  cat : string = "";
  constructor(private fbs: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  this.style = {
    color: Pallete.primaryColor,
  };

    this.fbs.getProductById(this.route.snapshot.params.id, product => {
      product.forEach(attr => {
        this.product[attr.key] = attr.payload.val();
      });
      this.saleprice=parseInt((this.product.price * (1 + (this.product.discount / 100))).toString());
      console.log(this.product);
      console.log(this.product.discount);
      console.log(this.product.price);
      console.log(this.saleprice);
      this.loading=false;
      if (this.product.category == 0)
          this.cat = "laptop";
      if (this.product.category == 1)
          this.cat = "PC";
      if (this.product.category == 2)
          this.cat = "Accessories";
      if (this.product.category == 3)
          this.cat = "Spares";
      if (this.product.category == 4)
          this.cat = "Server";
    })
  }
}