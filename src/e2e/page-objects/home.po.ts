import { PageObjectBase } from './base.po';

export class HomePage extends PageObjectBase {
  constructor() {
    super('app-home', '/home');
  }

  getBooks() {
    return this.getElement('.book-list');
  }

  async enterSearch(token: string) {
    await this.enterInputText('ion-searchbar', token);
  }

  async clickSearchClear() {
    await this.clickButton('ion-searchbar button');
  }
}
