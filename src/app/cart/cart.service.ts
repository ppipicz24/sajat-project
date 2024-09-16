import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../books/books.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  booksChangedInCart = new Subject<Book[]>();

  booksInCart: Book[] = [];

  getBooksInCart() {
    return this.booksInCart.slice();
  }

  getBookInCart(index: number) {
    return this.booksInCart[index];
  }

  setBooksInCart(books: Book[]) {
    this.booksInCart = books;
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  addBooksToCart(book: Book) {
    this.booksInCart.push(book);
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  updateBookinCart(index: number, newBook: Book) {
    this.booksInCart[index] = newBook;
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  deleteBookinCart(index: number) {
    this.booksInCart.splice(index, 1);
    this.booksChangedInCart.next(this.booksInCart.slice());
  }
}
