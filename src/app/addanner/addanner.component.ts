import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-addanner',
  templateUrl: './addanner.component.html',
  styleUrls: ['./addanner.component.css']
})
export class AddannerComponent implements OnInit {

  bImg: string = "";
  newBanner: any = {};
  image:string;

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService, private afStorage: AngularFireStorage) { }
  
  ngOnInit(): void { }
  
  setValue = (key: string, value: string) => {
    this.newBanner.image = value; 
  }
  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  addBanner = () => {
    if (
      !!this.newBanner.image
      ) {
      this.setLoading(true);
      this.uploadImage(this.newBanner.image, (image: string) => {
        this.fbs.addBanner({
          ...this.newBanner,
          image,
        }, () => {
          this.setLoading(false);
          alert("Banner added successfully.");
        })
      })
    } else {
      alert("Please enter all the data first.");
    }
  }

  
  uploadImage = (event, callback) => {
    const upload = this.afStorage.upload(
      event.target.files[0].name,
      event.target.files[0]
    );
    const fileRef = this.afStorage.ref(event.target.files[0].name);

    upload.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().toPromise().then(callback))
    )
      .subscribe()
  }

}
