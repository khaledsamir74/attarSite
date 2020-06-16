import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  pEmail: string = "";
  pNumber: string = "";
  pAddress: string = "";
  pDetails: string = "";

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) { }

  ngOnInit(): void { }

  setLoading(loading) {
    this.messageEvent.emit(loading)
  }

  addService = () => {
    if (
      this.pEmail &&
      this.pNumber &&
      this.pAddress &&
      this.pDetails
    ) {
      this.setLoading(true);
      this.fbs.addService({
        Email: this.pEmail,
        details: this.pDetails,
        number: this.pNumber,
        address:this.pAddress
      }, () => {
        this.setLoading(false);
        alert("Information sent successfully.")
      })
    } else {
      alert("Please fill all fields first.")
    }
  }
}
