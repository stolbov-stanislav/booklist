import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, SearchbarInputEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent } from '@ionic/core';

import { DataService, Book } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);

  public searchFilterToken = '';
  public filteredBooks = this.getBooks();

  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getBooks(): Book[] {
    return this.data.getBooks();
  }

  runGeneralFilter() {
    this.filteredBooks = this.getBooks()
      .filter((d) => (d.title.toLowerCase().indexOf(this.searchFilterToken) > -1) || (d.author.toLowerCase().indexOf(this.searchFilterToken) > -1));
  }

  handleSearchInput(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.searchFilterToken = event.detail.value?.toLowerCase() || '';
    this.runGeneralFilter();
  }
}
