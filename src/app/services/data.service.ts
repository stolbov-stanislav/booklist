import { Injectable } from '@angular/core';

export interface Book {
  id: number,
  title: string;
  author: string;
  pagesCount: number;
  language: string;
  genre: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public books: Book[] = [
    {
      title: 'New event: Trip to Vegas',
      author: 'Matt Chorsey',
      pagesCount: 32,
      language: 'English',
      genre: 'fiction',
      id: 0,
    },
    {
      title: 'Lolita',
      author: 'Nabokov',
      pagesCount: 200,
      language: 'Russian',
      genre: 'fiction',
      id: 1,
    },
    {
      title: 'Deep into Universe',
      author: 'Hawking',
      pagesCount: 100,
      language: 'English',
      genre: 'non-fiction',
      id: 2,
    },
    {
      title: 'The old man and the sea',
      author: 'Hemingway',
      pagesCount: 70,
      language: 'English',
      genre: 'fiction',
      id: 3,
    },
    {
      title: 'The Great Gatsby',
      author: 'Fitzgerald',
      pagesCount: 220,
      language: 'English',
      genre: 'fiction',
      id: 4,
    },
  ];

  public authors: Set<Book[`author`]> = new Set(this.books.map((v) => v.author));

  constructor() { }

  public getBooks(): Book[] {
    return this.books;
  }

  public getBookById(id: number): Book {
    return this.books[id];
  }

  public addBook(book: Omit<Book, 'id'>) {
    this.books.push({
      ...book,
      id: this.books.reduce((prev, curr) => prev.id > curr.id ? prev : curr).id + 1,
    });
  }

  public getAuthors(): Book[`author`][] {
    return Array.from(this.authors);
  }

  public addAuthor(author: Book[`author`]) {
    this.authors.add(author);
  }

  public editAuthor(author: Book[`author`], newAuthor: Book[`author`]) {
    this.authors.delete(author);
    this.authors.add(newAuthor);
  }
}
