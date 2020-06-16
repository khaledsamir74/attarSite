import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import Category from '../../models/category';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  newProduct: any = {};

  @Input() categories: Category[];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService, private afStorage: AngularFireStorage) { }
  
  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  ngOnInit(): void { }

  setValue = (key: string, value: string) => {
    this.newProduct[key] = value;
  }

  addProduct = () => {
    console.log("first part");
    if (
      !!this.newProduct.name &&
      !!this.newProduct.desc &&
      !!this.newProduct.image &&
      !!this.newProduct.price &&
      !!this.newProduct.category
    ) {
      this.setLoading(true);
      if (!this.newProduct.discount) this.newProduct.discount = 0;
      this.uploadImage(this.newProduct.image, (image: string) => {
        this.fbs.addProduct({
          ...this.newProduct,
          image,
        }, () => {
          this.setLoading(false);
          alert("Product added successfully.");
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