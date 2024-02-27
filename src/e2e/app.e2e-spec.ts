import { ElementFinder, by } from "protractor";
import { HomePage } from "./page-objects/home.po";

describe('Home page', () => {
  const home = new HomePage();

  beforeEach(() => {
    home.load();
  });

  it('should display the home screen', async () => {
    expect(await home.rootElement().isDisplayed()).toBe(true);
  });

  it('should filter book via search', async () => {
    await home.enterSearch('New event: Trip to Vegas');
    const books = await home.getBooks().all(by.css('.book-item'));
    expect(books.length).toBe(1);
    const author = await (books[0] as ElementFinder).$('h3').getText();
    expect(author).toBe('Matt Chorsey');
  });

  it('should clear search by clear button click', async () => {
    await home.enterSearch('New event: Trip to Vegas');
    expect((await home.getBooks().all(by.css('.book-item'))).length).toBe(1);
    await home.clickSearchClear();
    expect((await home.getBooks().all(by.css('.book-item'))).length).toBe(5);
  });
});
