import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, SearchbarInputEventDetail, SelectChangeEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent, IonSelectCustomEvent, IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';

import { DataService, Book } from '../services/data.service';
import { Observable, firstValueFrom, from } from 'rxjs';
import { liveQuery } from 'dexie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);

  public authors!: Observable<Book[`author`][]>;
  public languages: Set<Book[`language`]> = new Set();
  public minPages: number = 0;
  public maxPages: number = 0;
  public genres: Set<Book[`genre`]> = new Set();

  public searchFilterToken = '';
  public authorFilterTokens: Book[`author`][] = [];
  public languageFilterTokens: Book[`language`][] = [];
  public pageMinFilterToken: number = 0;
  public pageMaxFilterToken: number = 0;
  public genreFilterToken = '';
  public filteredBooks: Book[] = [];

  constructor() {
    this.initAsyncProperties();
  }

  async initAsyncProperties() {
    const books = await this.data.getBooks();
    this.authors = from(liveQuery(() => this.data.getAuthors()));
    this.languages = new Set(books.map((d) => d.language));
    this.minPages = books.reduce((prev, curr) => prev.pagesCount < curr.pagesCount ? prev : curr).pagesCount;
    this.maxPages = books.reduce((prev, curr) => prev.pagesCount > curr.pagesCount ? prev : curr).pagesCount;
    this.genres = new Set(books.map((d) => d.genre)).add('all');

    this.authorFilterTokens = await firstValueFrom(this.authors);
    this.languageFilterTokens = Array.from(this.languages);
    this.pageMinFilterToken = this.minPages;
    this.pageMaxFilterToken = this.maxPages;
    this.filteredBooks = books;
  } 

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async runGeneralFilter() {
    this.filteredBooks = (await this.data.getBooks())
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

  async handleFilterByAuthor(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query: string[] = event.detail.value;
    this.authorFilterTokens = query.length > 0 ? query : await firstValueFrom(this.authors);
    this.runGeneralFilter();
  }

  handleFilterByLanguage(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const query: string[] = event.detail.value;
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
