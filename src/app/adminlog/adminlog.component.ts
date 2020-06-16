import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import admin from '../models/admin';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute,Router } from '@angular/router'
@Component({
  selector: 'app-adminlog',
  templateUrl: './adminlog.component.html',
  styleUrls: ['./adminlog.component.css']
})
export class AdminlogComponent implements OnInit {

  admins: admin[] = [];
  @Input() categories: admin[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

constructor(private fbs: FirebaseService , private activatedRoute:ActivatedRoute , private router:Router) {
    this.setLoading(true);
    this.fbs.getAlladmins(admins => {
      this.admins = [];
      admins.forEach(admin => this.admins.push({
        ...admin.payload.val(),
        id: admin.key,
      }));
      this.setLoading(false);
    })

  }
  setLoading(loading) {
    this.messageEvent.emit(loading)
  }
  ngOnInit(): void {
   
  }
  Login = () => {
    let done : boolean = false;
    for (let i of this.admins)
    {
      if ((<HTMLInputElement> document.getElementById("exampleInputEmail1")).value == i.user &&
      (<HTMLInputElement> document.getElementById("exampleInputPassword1")).value == i.pass)
      {
      localStorage.setItem('adminPanelToken', 'elattarOasis');
      this.router.navigate(['/adminPanel']);
      done = true;
    }
      
    }
    if(!done){
    alert("Wrong user");
  }
  }
}
