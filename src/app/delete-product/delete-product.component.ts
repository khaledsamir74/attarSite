import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Product from '../models/Product';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  currentIndex: number;
  current: Product;
  edited: Product = {} as any;

  products: Product[] = [];
  @Input() categories: Product[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) {
    this.setLoading(true);
    this.fbs.getAllProducts(products => {
      this.products = [];
      products.forEach(product => this.products.push({
        ...product.payload.val(),
        id: product.key,
      }));

      this.current = this.products[0];
      this.edited = {
        ...this.products[0],
        discount: -this.products[0].discount
      };
      this.currentIndex = 0;
      this.setLoading(false);
    })
  }
  
  ngOnInit(): void { }

  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  editValue = (key, value) => {
    this.edited[key] = value;
  }

  isEdited = () => (JSON.stringify(this.current) !== JSON.stringify({
    ...this.edited,
    discount: -this.edited.discount
  }));

  onChangeProduct = ($event) => {
    console.log(this.current, this.edited)
    if (this.isEdited()) {
      if (confirm("You will lose all your changes.")) {
        this.currentIndex = $event.srcElement.selectedIndex;
        this.current = this.products[this.currentIndex] as any;
        this.edited = {
          ...this.products[this.currentIndex],
          discount: -this.products[this.currentIndex].discount
        } as any;
        return;
      }
    } else {
      this.currentIndex = $event.srcElement.selectedIndex;
      this.current = this.products[this.currentIndex] as any;
      this.edited = {
        ...this.products[this.currentIndex],
        discount: -this.products[this.currentIndex].discount
      } as any;
      return;
    }

    $event.srcElement.selectedIndex = this.currentIndex;
  }

  onEditClick = () => {
    if (this.isEdited()) {
      this.setLoading(true);
      this.fbs.editProduct(this.edited, () => this.setLoading(false))
    } else {
      alert("No changes to be saved.")
    }
  }

  onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      this.setLoading(true);
      this.fbs.deleteProduct(this.current, () => {
        this.setLoading(false);
      })
    }
  }
}
