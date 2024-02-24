import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, SearchbarInputEventDetail, SelectChangeEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent, IonSelectCustomEvent } from '@ionic/core';

import { DataService, Book } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);

  public authors = new Set(this.getBooks().map((d) => d.author));

  public searchFilterToken = '';
  public authorFilterTokens: String[] = Array.from(this.authors);
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
      .filter((d) => (d.title.toLowerCase().indexOf(this.searchFilterToken) > -1) || (d.author.toLowerCase().indexOf(this.searchFilterToken) > -1))
      .filter((d) => this.authorFilterTokens.includes(d.author));
  }

  handleSearchInput(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.searchFilterToken = event.detail.value?.toLowerCase() || '';
    this.runGeneralFilter();
  }

  handleFilterByAuthor(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query: String[] = event.detail.value;
    this.authorFilterTokens = query.length > 0 ? query : Array.from(this.authors);
    this.runGeneralFilter();
  }
}
