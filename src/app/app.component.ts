import { Component } from '@angular/core';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js'
import 'node_modules/jquery/dist/jquery.min.js'
import 'node_modules/popper.js/dist/umd/popper.min.js'
import { FirebaseService } from './firebase.service';
import Product from './models/Product';
import { Title }from '@angular/platform-browser';
import Pallete from "./constants/palette";

import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: 'The href is: {{href}}'
})

export class AppComponent {
  
style: Object;
accent: Object;
drdown: Object;
href: string = "";
  public constructor(private titleService: Title ,private router: Router) {
    this.titleService.setTitle("Oasis-Tech");
    this.style = {
      backgroundColot: Pallete.accentColor,
      color: Pallete.textColor
    };
    
    this.accent = {
      color: Pallete.accentColor,
      borderColor: Pallete.accentColor,
    }
    this.drdown = {
      backgroundColot: Pallete.accentColor,
      color: Pallete.primaryColor
    }
        this.href = this.router.url;
        console.log("this is "+this.router.url);
   }

}
