import { Component, OnInit, Input } from '@angular/core';
import Pallete from "../../constants/palette";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  style: Object;
  accent: Object;
  drdown: Object;

  constructor() { }

  ngOnInit(): void {
    this.style = {
      backgroundColor: Pallete.primaryColor,
      color: Pallete.textColor
    };
    
    this.accent = {
      color: Pallete.accentColor,
      borderColor: Pallete.accentColor,
    }
    this.drdown = {
      backgroundColot: Pallete.accentColor,
      color: Pallete.textColor
    }
  }
}
