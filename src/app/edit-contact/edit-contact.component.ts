import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import contact from '../models/contact';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  currentIndex: number;
  current: contact;
  edited: contact = {} as any;

  contacts: contact[] = [];
  @Input() categories: contact[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) {
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

  editValue = (key, value) => {
    this.edited[key] = value;
  }

  isEdited = () => (JSON.stringify(this.current) !== JSON.stringify({
    ...this.edited
  }));

  onChangecontact = ($event) => {
    console.log(this.current, this.edited)
    if (this.isEdited()) {
      if (confirm("You will lose all your changes.")) {
        this.currentIndex = $event.srcElement.selectedIndex;
        this.current = this.contacts[this.currentIndex] as any;
        this.edited = {
          ...this.contacts[this.currentIndex]
        } as any;
        return;
      }
    } else {
      this.currentIndex = $event.srcElement.selectedIndex;
      this.current = this.contacts[this.currentIndex] as any;
      this.edited = {
        ...this.contacts[this.currentIndex]
      } as any;
      return;
    }

    $event.srcElement.selectedIndex = this.currentIndex;
  }

  onEditClick = () => {
    if (this.isEdited()) {
      this.setLoading(true);
      this.fbs.editContact(this.edited, () => this.setLoading(false))
    } else {
      alert("No changes to be saved.")
    }
  }

  onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.setLoading(true);
      this.fbs.deleteContact(this.current, () => {
        this.setLoading(false);
      })
    }
  }
}
