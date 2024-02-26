import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Book {
  title: string;
  author: string;
  pagesCount: number;
  language: string;
  genre: string;
  id?: number;
  description?: string;
}

export interface Author {
  name: string;
  id?: number;
}

export const BOOKS = [
  {
    title: 'New event: Trip to Vegas',
    author: 'Matt Chorsey',
    pagesCount: 32,
    language: 'English',
    genre: 'fiction',
  },
  {
    title: 'Lolita',
    author: 'Nabokov',
    pagesCount: 200,
    language: 'Russian',
    genre: 'fiction',
  },
  {
    title: 'Deep into Universe',
    author: 'Hawking',
    pagesCount: 100,
    language: 'English',
    genre: 'non-fiction',
  },
  {
    title: 'The old man and the sea',
    author: 'Hemingway',
    pagesCount: 70,
    language: 'English',
    genre: 'fiction',
  },
  {
    title: 'The Great Gatsby',
    author: 'Fitzgerald',
    pagesCount: 220,
    language: 'English',
    genre: 'fiction',
  },
];

@Injectable({
  providedIn: 'root'
})
export class DataService extends Dexie {
  public books!: Table<Book, number>;
  public authors!: Table<Author, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      books: '++id',
      authors: '++id, &name',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    try {
      await this.books.bulkAdd(BOOKS);
      await this.books.each((book) => this.authors.add({name: book.author}));
    }
    catch (e) {
      throw new Error(`DataService populate error: ${e}`);
    }
  }

@Injectable({
  providedIn: 'root'
})
export class DataService extends Dexie {
  public books!: Table<Book, number>;
  public authors!: Table<Author, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      books: '++id',
      authors: '++id, &name',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await this.books.bulkAdd([
      {
        title: 'New event: Trip to Vegas',
        author: 'Matt Chorsey',
        pagesCount: 32,
        language: 'English',
        genre: 'fiction',
      },
      {
        title: 'Lolita',
        author: 'Nabokov',
        pagesCount: 200,
        language: 'Russian',
        genre: 'fiction',
      },
      {
        title: 'Deep into Universe',
        author: 'Hawking',
        pagesCount: 100,
        language: 'English',
        genre: 'non-fiction',
      },
      {
        title: 'The old man and the sea',
        author: 'Hemingway',
        pagesCount: 70,
        language: 'English',
        genre: 'fiction',
      },
      {
        title: 'The Great Gatsby',
        author: 'Fitzgerald',
        pagesCount: 220,
        language: 'English',
        genre: 'fiction',
      },
    ]);
    
    await this.books.each((book) => this.authors.add({name: book.author}));
  }

  public getBooks(): Promise<Book[]> {
    return this.books.toArray();
  }

  public getBookById(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  public async addBook(book: Book) {
    try {
      await this.books.add(book);
      const author = await this.authors.get({name: book.author});
      if (!author) {
        await this.authors.add({name: book.author});
      }
    }
    catch (e) {
      throw new Error(`DataService addBook error: ${e}`);
    }
  }

  public async addBooks(books: Book[]) {
    try {
      await this.books.bulkAdd(books);
      for (const book of books) {
        const author = await this.authors.get({name: book.author});
        if (!author) {
          await this.authors.add({name: book.author});
        }
      }
    }
    catch (e) {
      throw new Error(`DataService addBooks error: ${e}`);
    }
  }

  public async getAuthors(): Promise<Author[`name`][]> {
    const authors = await this.authors.toArray();
    return authors.map((author) => author.name);
  }

  public async addAuthor(name: Book[`author`]) {
    try {
      const author = await this.authors.get({name});
      if (!author) {
        await this.authors.add({name});
      }
    }
    catch (e) {
      throw new Error(`DataService addAuthor error: ${e}`);
    }
  }

  public async editAuthor(author: Book[`author`], newAuthor: Book[`author`]) {
    try {
      await this.authors.where({name: author}).modify({name: newAuthor});
    }
    catch (e) {
      throw new Error(`DataService editAuthor error: ${e}`);
    }
  }
}
