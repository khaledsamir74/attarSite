import { Component, OnInit } from '@angular/core';
import Pallete from "../../constants/palette";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  style: Object;
  accent: Object;

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
  }

}
