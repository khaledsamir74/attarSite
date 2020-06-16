import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  pName: string = "";
  pNumber: string = "";
  pAdress: string = "";
  pFB: string = "";

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) { }

  ngOnInit(): void { }

  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  addContact = () => {
    if (
      this.pName &&
      this.pNumber &&
      this.pAdress &&
      this.pFB
    ) {
      this.setLoading(true);
      this.fbs.addContact({
        name: this.pName,
        FBlink: this.pFB,
        number: this.pNumber,
        address:this.pAdress
      }, () => {
        this.setLoading(false);
        alert("Contact added successfully.")
      })
    } else {
      alert("Please fill all fields first.")
    }
  }
}
