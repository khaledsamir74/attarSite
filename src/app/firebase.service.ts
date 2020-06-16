import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import Product from './models/Product';
import Category from './models/category';
import Contact from './models/Contact';
import Banner from './models/Banner';
import Service from './models/Service';
import Admin from './models/Admin';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  productsRefPath = "/products";
  categoriesRefPath = "/categories";
  bannersRefPath = "/others/banner";
  productsToSortRefPath = "/productsToBeSorted";
  contactsRefPath = "/others/contacts/noOwner";
  servicesRefPath = "/Service";
  adminsRefPath = "/others/admin";

  productsRef: AngularFireList<Product>;
  contactsRef: AngularFireList<Contact>;
  categoriesRef: AngularFireList<Category>;
  bannersRef: AngularFireList<any>;
  servicesRef: AngularFireList<Service>;
  adminsRef: AngularFireList<Admin>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.productsRefPath);
    this.categoriesRef = db.list(this.categoriesRefPath);
    this.bannersRef = db.list(this.bannersRefPath);
    this.contactsRef = db.list(this.contactsRefPath);
    this.servicesRef = db.list(this.servicesRefPath);
    this.adminsRef = db.list(this.adminsRefPath);
  }

  getProductsOnSale = (callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(this.productsRefPath, ref => {
      return ref.orderByChild("discount").limitToFirst(5);
    }).snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getBanners = (callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.bannersRef.snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getProductsByCategory = (categoryId: string, callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(this.productsRefPath, ref => {
      return ref.orderByChild("category").equalTo(categoryId);
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  addProduct = (product: Product, callback) => {
    product.salePrice = Math.trunc(product.price * (1 - (product.discount / 100)));
    product.discount = -product.discount;
    
    this.productsRef.push(product)
      .then((value) => {
        this.db.list(`${this.productsToSortRefPath}/${product.category}`).set(value.key, {
          ...product,
          salePriceInverted: -product.salePrice,
        }).then(callback);
      })
  }

  getProductsSortedByPrice = (category: string, callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(`${this.productsToSortRefPath}/${category}`, ref => {
      return ref.orderByChild("salePrice");
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getProductsSortedBySale = (category: string, callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(`${this.productsToSortRefPath}/${category}`, ref => {
      return ref.orderByChild("discount");
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getProductsSortedByPriceInverted = (category: string, callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(`${this.productsToSortRefPath}/${category}`, ref => {
      return ref.orderByChild("salePriceInverted");
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getProductById = (id: string, callback: (actions: SnapshotAction<any>[]) => void) => {
    this.db.list(`${this.productsRefPath}/${id}`, ref => {
      return ref;
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getAllCategories = (callback: (actions: SnapshotAction<Category>[]) => void) => {
    this.categoriesRef
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  getAllProducts = (callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.productsRef
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }

  editProduct = (product: Product, callback) => {
    this.db.list(`${this.productsToSortRefPath}/${product.category}`).set(product.id, {
      ...product,
      salePrice: product.price * (1 - (product.discount / 100)),
      salePriceInverted: product.price * (1 - (product.discount / 100)),
      discount: -product.discount
    }).then(() => {
      this.db.list(`${this.productsRefPath}`).set(product.id, {
        ...product,
        salePrice: product.price * (1 - (product.discount / 100)),
        salePriceInverted: product.price * (1 - (product.discount / 100)),
        discount: -product.discount
      }).then(callback);
    });
  }

  deleteProduct = (product: Product, callback) => {
    this.db.list(`${this.productsToSortRefPath}/${product.category}/${product.id}`).remove().then(() => {
      this.db.list(`${this.productsRefPath}/${product.id}`).remove().then(callback)
    })
  }

  addContact = (contact: Contact, callback) => {
    this.db.list(this.contactsRefPath).push(contact).then(callback);
  }
  getAllcontacts = (callback: (actions: SnapshotAction<Contact>[]) => void) => {
    this.contactsRef
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }
  editContact = (contact: Contact, callback) => {
    this.db.list(`${this.contactsRefPath}`).set(contact.id, {
      ...contact
    })
  }

  deleteContact = (contact: Contact, callback) => {
    this.db.list(`${this.contactsRefPath}`).remove(contact.id)
  }
  addBanner = (banner: Banner, callback) => {
    this.db.list(this.bannersRefPath).push(banner).then(callback);
  }
  deleteBanner = (banner: Banner, callback) => {
    this.db.list(`${this.bannersRefPath}`).remove(banner.id);
  }
  getAllBanners = (callback: (actions: SnapshotAction<Banner>[]) => void) => {
    this.bannersRef
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }
  addService = (Service: Service, callback) => {
    this.db.list(this.servicesRefPath).push(Service).then(callback);
  }
  getAllServices = (callback: (actions: SnapshotAction<Service>[]) => void) => {
    this.servicesRef
    .snapshotChanges(["child_added", "child_changed", "child_removed"])
    .subscribe(callback);
  }
  editService = (service: Service, callback) => {
    this.db.list(`${this.servicesRefPath}`).set(service.id, {
      ...service
    })
  }
  deleteService = (service: Service, callback) => {
    this.db.list(`${this.servicesRefPath}`).remove(service.id)
  }
  addAdmin = (admin: Admin, callback) => {
    this.db.list(this.adminsRefPath).push(admin).then(callback);
  }
  getAlladmins = (callback: (actions: SnapshotAction<Admin>[]) => void) => {
    this.adminsRef
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }
  getProductsSortedBySaleFive = (category: string, callback: (actions: SnapshotAction<Product>[]) => void) => {
    this.db.list(`${this.productsToSortRefPath}/${category}`, ref => {
      return ref.orderByChild("discount").limitToFirst(5);
    })
      .snapshotChanges(["child_added", "child_changed", "child_removed"])
      .subscribe(callback);
  }
   
}