import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Contact } from './contact.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contacts: Contact[];
  searchText: string;
  contactToAdd: Contact = this.getEmptyContact();
  inEditMode = false;

  constructor(private http: Http) {}

  ngOnInit() {
    this.getContacts();
  }

  addContact() {
    if (this.inEditMode) {
      this.contacts.push(this.contactToAdd);
      this.saveContact(this.contactToAdd);
      this.contactToAdd = this.getEmptyContact();
    } else {
      this.inEditMode = true;
    }
  }

  private getContacts() {
    const headers: Headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    this.http.get('https://gilscontacts.azurewebsites.net/api/getContactList', {
      headers: headers,
    }).subscribe((res) => {
      this.contacts = res.json() as Contact[];
    }, (error) => {
      console.log('error');
    });
  }

  private saveContact(contact: Contact) {
    this.http.post('https://gilscontacts.azurewebsites.net/api/addNewContact', contact).
    subscribe(() => {
      console.log('Succ');
    }, (error) => {
      console.log('fail ' + error);
    });
  }

  private getEmptyContact() {
    return {
      FullName: undefined,
      Phone: undefined,
    };
  }
}
