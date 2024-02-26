import { TestBed } from '@angular/core/testing';

import { BOOKS, DataService } from './data.service';

export const BOOK = {
  title: 'Onegin',
  author: 'Pushkin',
  pagesCount: 222,
  language: 'Russian',
  genre: 'fiction',
};

describe('DataService', () => {
  let service: DataService;

  beforeAll(async () => {
    TestBed.configureTestingModule({ providers: [DataService] });
    service = TestBed.inject(DataService);
    await service.clearAll();
  });

  beforeEach(async () => {
    await service.addBooks(BOOKS);
  });

  afterEach(async () => {
    await service.clearAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add book', async () => {
    await service.addBook(BOOK);
    const books = await service.getBooks();
    expect(books.find((book) => book.title === BOOK.title)).toBeTruthy();
  });

  it('should add book with id', async () => {
    const id = 100;
    await service.addBook(Object.assign(BOOK, {id}));
    const book = await service.getBookById(100);
    expect(book).toBeTruthy();
  });

  it('should add author', async () => {
    await service.addAuthor(BOOK.author);
    const authors = await service.getAuthors();
    expect(authors.includes(BOOK.author)).toBeTruthy();
  });

  it('should edit author', async () => {
    const name = 'Tolstoy';
    await service.addAuthor(BOOK.author);
    await service.editAuthor(BOOK.author, name);
    const authors = await service.getAuthors();
    expect(authors.includes(name)).toBeTruthy();
  });

  it('should not add author', async () => {
    await service.addAuthor(BOOK.author);
    const countBefore = (await service.getAuthors()).length;
    await service.addAuthor(BOOK.author);
    const countAfter = (await service.getAuthors()).length;
    expect(countBefore === countAfter).toBeTruthy();
  });
});
