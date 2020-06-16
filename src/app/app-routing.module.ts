import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempComponent } from './temp/temp.component';
import { NavbarComponent } from '../app/main/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from '../app/products/products.component';
import { PrductdetailsComponent } from '../app/products/prductdetails/prductdetails.component';
import { AdminpanalComponent } from '../app/adminpanal/adminpanal.component';
import { ContactsComponent } from '../app/contacts/contacts.component';
import { ServicesComponent } from '../app/services/services.component';
import { AdminlogComponent } from './adminlog/adminlog.component';

const routes: Routes = [
  { path : "" ,
    component : HomeComponent,
},
{
  path : "products/:category" ,
  component : ProductsComponent,
},
{
  path : "product/:id" ,
  component : PrductdetailsComponent,
},
{
  path : "adminPanel" ,
  component : AdminpanalComponent,
},
{
  path : "contacts" ,
  component : ContactsComponent,
},
{
  path : "services" ,
  component : ServicesComponent,
},
{
  path: 'adminlog',
  component: AdminlogComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
