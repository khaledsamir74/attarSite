import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import service from '../models/service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-viewservices',
  templateUrl: './viewservices.component.html',
  styleUrls: ['./viewservices.component.css']
})
export class ViewservicesComponent implements OnInit {
  currentIndex: number;
  current: service;
  edited: service = {} as any;

  services: service[] = [];
  @Input() categories: service[] = [];
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private fbs: FirebaseService) {
    this.setLoading(true);
    this.fbs.getAllServices(services => {
      this.services = [];
      services.forEach(service => this.services.push({
        ...service.payload.val(),
        id: service.key,
      }));

      this.current = this.services[0];
      this.edited = {
        ...this.services[0]
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

  onChangeservice = ($event) => {
    console.log(this.current, this.edited)
    if (this.isEdited()) {
      if (confirm("You will lose all your changes.")) {
        this.currentIndex = $event.srcElement.selectedIndex;
        this.current = this.services[this.currentIndex] as any;
        this.edited = {
          ...this.services[this.currentIndex]
        } as any;
        return;
      }
    } else {
      this.currentIndex = $event.srcElement.selectedIndex;
      this.current = this.services[this.currentIndex] as any;
      this.edited = {
        ...this.services[this.currentIndex]
      } as any;
      return;
    }

    $event.srcElement.selectedIndex = this.currentIndex;
  }

  onEditClick = () => {
    if (this.isEdited()) {
      this.setLoading(true);
      this.fbs.editService(this.edited, () => this.setLoading(false))
    } else {
      alert("No changes to be saved.")
    }
  }

  onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this service?")) {
      this.setLoading(true);
      this.fbs.deleteService(this.current, () => {
        this.setLoading(false);
      })
    }
  }
}
