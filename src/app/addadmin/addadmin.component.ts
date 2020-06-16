import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  username: string = "";
  password: string = "";
  
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) { }

  ngOnInit(): void {
  }
  
  setLoading(loading) {
    this.messageEvent.emit(loading)
  }
  addAdmin = () => {
    if (
      this.username &&
      this.password
    ) {
      this.setLoading(true);
      this.fbs.addAdmin({
        user: this.username,
        pass: this.password
      }, () => {
        this.setLoading(false);
        alert("Admin added successfully.")
      })
    } else {
      alert("Please fill all fields first.")
    }
  }
}
