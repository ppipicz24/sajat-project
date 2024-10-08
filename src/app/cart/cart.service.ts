import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../books/books.model';
import { Cart } from './cart.model';
import { get } from 'animejs';

@Injectable({ providedIn: 'root' })
export class CartService {
  booksChangedInCart = new Subject<Cart[]>();

  booksInCart: Cart[] = [];
  

  getBooksInCart() {
    console.log(this.booksInCart)
    return this.booksInCart.slice();
  }

  getBookInCart(index: number) {
    return this.booksInCart[index];
  }
  
  setBooksInCart(id: number, count: number) {
    this.booksInCart.push({id: id, count: count});
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  getBookCountInCart(id: number) {
    const books = this.getBooksInCart()
    let count = 0;
    books.forEach((element, index) => {
      if(books[index].id === id){
        count = books[index].count
      }
    });
    return count;
  }


  addBooksToCart(book: Cart) {

    const books = this.getBooksInCart()
    console.log(books)
    console.log(book)
    
    if(books.length === 0){
      this.booksInCart.push(book);
    }

    books.forEach((element, index) => {
      if(books[index].id === book.id){
        this.booksInCart[index].count += 1
      }
    });

    localStorage.setItem('cart', JSON.stringify(this.booksInCart));
    this.booksChangedInCart.next(this.booksInCart.slice());

  }


  updateBookinCart(index: number, newBook: Cart) {
    this.booksInCart[index] = newBook;
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  deleteBookinCart(index: number) {
    this.booksInCart.splice(index, 1);
    this.booksChangedInCart.next(this.booksInCart.slice());
  }
}
