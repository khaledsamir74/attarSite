import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Item } from './item';
import Product from './models/Product';
 
@Injectable({
  providedIn: 'root'
})

export class ItemService {
 
  private dbPath = '/category/';
 
  ItemRef: AngularFireList<Product> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.ItemRef = db.list(this.dbPath);
  }

  createItem(item: Product): void {
    this.ItemRef = this.db.list("/products");
    this.ItemRef.push(item);
  }
 
  updateItem(path: string, key: string, value: any): Promise<void> {
    this.ItemRef = this.db.list(path);
    return this.ItemRef.update(key, value);
  }
 
  deleteItem(path: string, key: string): Promise<void> {
    this.ItemRef = this.db.list(path);
    return this.ItemRef.remove(key);
  }
 
  getItemsList(path: string): AngularFireList<Product> {
    this.ItemRef = this.db.list(path);
    return this.ItemRef;
  }
 
  deleteAll(path: string): Promise<void> {
    this.ItemRef = this.db.list(path);
    return this.ItemRef.remove();
  }
}