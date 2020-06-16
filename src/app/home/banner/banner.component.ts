import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banners: any[] = [];
  loading: boolean = true;
  navStyle: any;

  constructor(fbs: FirebaseService){
    fbs.getBanners((actions) => {
      this.banners = [];
      actions.forEach(action => {
        this.banners.push({
          src: action.payload.val(),
          class: "carousel-item bannerImage"
        })
      })

      this.banners[0].class += " active";
      this.banners[0].indicatorsClass = "active";
      this.loading = false;
    });
  }
  
  @Input()
  containerStyle: Object;

  ngOnInit(): void {
  }
    }
