import { Component, OnInit } from '@angular/core';
import Pallete from "../../constants/palette";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  style: Object;
  accent: Object;
  constructor() { }

  ngOnInit(): void {
    this.style = {
      backgroundColor: Pallete.primaryColor,
      color: Pallete.accentColor
    };
    
    this.accent = {
      color: Pallete.accentColor,
      borderColor: Pallete.accentColor,
    }
  }

}
