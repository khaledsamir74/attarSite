import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Banner from '../models/Banner';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-deletebanner',
  templateUrl: './deletebanner.component.html',
  styleUrls: ['./deletebanner.component.css']
})
export class DeletebannerComponent implements OnInit {

  currentIndex: number;
  current: Banner;
  edited: Banner = {} as any;

  Banners: Banner[] = [];
  @Input() categories: Banner[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) {
    this.setLoading(true);
    this.fbs.getAllBanners(Banners => {
      this.Banners = [];
      Banners.forEach(Banner => this.Banners.push({
        ...Banner.payload.val(),
        id: Banner.key,
      }));

      this.current = this.Banners[0];
      this.currentIndex = 0;
      this.setLoading(false);
    })
  }
  
  ngOnInit(): void { }

  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this Banner?")) {
      this.setLoading(true);
      console.log("here one");
      this.fbs.deleteBanner(this.current, () => {
        console.log("here two");
        this.setLoading(false);
        confirm("Banner deleted successfully");
      })
    }
  }
}
