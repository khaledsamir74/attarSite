import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import contact from '../models/contact';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  currentIndex: number;
  current: contact;
  edited: contact = {} as any;

  contacts: contact[] = [];
  @Input() categories: contact[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) {
    document.getElementById("catBtn").style.display = "block";
    this.setLoading(true);
    this.fbs.getAllcontacts(contacts => {
      this.contacts = [];
      contacts.forEach(contact => this.contacts.push({
        ...contact.payload.val(),
        id: contact.key,
      }));

      this.current = this.contacts[0];
      this.edited = {
        ...this.contacts[0]
      };
      this.currentIndex = 0;
      this.setLoading(false);
    })
  }
  ngOnInit(): void {
  }
  setLoading(loading) {
    this.messageEvent.emit(loading)
  }
}
