import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(contacts: Contact[], searchText: string): any {

    if (searchText == null) {
        return contacts;
    }

    return contacts.filter((contact) => {
      return contact.FullName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            contact.Phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}
