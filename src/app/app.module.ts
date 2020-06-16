import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TempComponent } from './temp/temp.component';
import { NavbarComponent } from '../app/main/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from '../app/main/footer/footer.component';
import { BannerComponent } from '../app/home/banner/banner.component';
import { CategoryComponent } from '../app/home/category/category.component';
import { DiscountComponent } from './home/discount/discount.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { PrductdetailsComponent } from './products/prductdetails/prductdetails.component';
import { AdminpanalComponent } from './adminpanal/adminpanal.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ServicesComponent } from './services/services.component';
import { AdditemComponent } from './adminpanal/additem/additem.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddannerComponent } from './addanner/addanner.component';
import { DeletebannerComponent } from './deletebanner/deletebanner.component';
import { ViewservicesComponent } from './viewservices/viewservices.component';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LaptopComponent } from './home/laptop/laptop.component';
import { PcComponent } from './home/pc/pc.component';


@NgModule({
  declarations: [
    AppComponent,
    TempComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    CategoryComponent,
    DiscountComponent,
    ProductsComponent,
    ProductCardComponent,
    PrductdetailsComponent,
    AdminpanalComponent,
    ContactsComponent,
    ServicesComponent,
    AdditemComponent,
    DeleteProductComponent,
    AddContactComponent,
    EditContactComponent,
    AddannerComponent,
    DeletebannerComponent,
    ViewservicesComponent,
    AdminlogComponent,
    AddadminComponent,
    LaptopComponent,
    PcComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    CommonModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
