import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import Category from '../models/category';
import Product from '../models/Product';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-adminpanal',
  templateUrl: './adminpanal.component.html',
  styleUrls: ['./adminpanal.component.css']
})
export class AdminpanalComponent implements OnInit {

  operation: number = 4;
  categories: Category[] = [];
  loading: boolean = true;

  current: boolean = true;
  op0: boolean = false;
  op1: boolean = false;
  op2: boolean = false;
  op3: boolean = false;
  op4: boolean = false;
  op5: boolean = false;
  op6: boolean = false;

  constructor(private fbs: FirebaseService, private activatedRoute:ActivatedRoute , private router:Router) {
    this.fbs.getAllCategories(categories => {
      this.categories = [];
      categories.forEach(category => this.categories.push({
        ...category.payload.val(),
        id: category.key,
      }));
      this.current = false;
      this.setLoading();
    });
    

    

  }

  receiveMessage($event, opId: string) {
    this[opId] = $event;
    this.setLoading();
  }

  ngOnInit(): void {
    if (localStorage.getItem('adminPanelToken') != 'elattarOasis') {
    this.router.navigate(['/adminlog']);
  }
  else { console.log ("wesel hena");
}
}
logOut = () => {
  localStorage.setItem('adminPanelToken', 'not');
  this.router.navigate(['/adminlog']);
}

  setOperation = (operationIndex: number) => this.operation = operationIndex;
  setLoading = () => this.loading = this.current || this.op0 || this.op1 || this.op2 || this.op3 || this.op4 || this.op5 || this.op6;
}
