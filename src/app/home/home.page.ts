import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, SearchbarInputEventDetail, SelectChangeEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent, IonSelectCustomEvent, IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';

import { DataService, Book } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);

  public authors = this.data.getAuthors();
  public languages = new Set(this.getBooks().map((d) => d.language));
  public minPages = this.getBooks().reduce((prev, curr) => prev.pagesCount < curr.pagesCount ? prev : curr).pagesCount;
  public maxPages = this.getBooks().reduce((prev, curr) => prev.pagesCount > curr.pagesCount ? prev : curr).pagesCount;
  public genres = new Set(this.getBooks().map((d) => d.genre)).add('all');

  public searchFilterToken = '';
  public authorFilterTokens: String[] = Array.from(this.authors);
  public languageFilterTokens: String[] = Array.from(this.languages);
  public pageMinFilterToken = this.minPages;
  public pageMaxFilterToken = this.maxPages;
  public genreFilterToken = '';
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
      .filter((d) => this.authorFilterTokens.includes(d.author))
      .filter((d) => this.languageFilterTokens.includes(d.language))
      .filter((d) => d.pagesCount >= this.pageMinFilterToken)
      .filter((d) => d.pagesCount <= this.pageMaxFilterToken)
      .filter((d) => this.genreFilterToken ? d.genre === this.genreFilterToken: true);
  }

  handleSearchInput(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.searchFilterToken = event.detail.value?.toLowerCase() || '';
    this.runGeneralFilter();
  }

  handleFilterByAuthor(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query: String[] = event.detail.value;
    this.authorFilterTokens = query.length > 0 ? query : this.authors;
    this.runGeneralFilter();
  }

  handleFilterByLanguage(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query: String[] = event.detail.value;
    this.languageFilterTokens = query.length > 0 ? query : Array.from(this.languages);
    this.runGeneralFilter();
  }

  handleFilterByPagesMin(event: IonInputCustomEvent<InputInputEventDetail>) {
    const query = event.detail.value;
    this.pageMinFilterToken = query ? Number(query) : this.minPages;
    this.runGeneralFilter();
  }

  handleFilterByPagesMax(event: IonInputCustomEvent<InputInputEventDetail>) {
    const query = event.detail.value;
    this.pageMaxFilterToken = query ? Number(query) : this.maxPages;
    this.runGeneralFilter();
  }
  
  handleFilterByGenre(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query = event.detail.value;
    this.genreFilterToken = query === 'all' ? '' : query;
    this.runGeneralFilter();
  }
}
