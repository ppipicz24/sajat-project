import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  booksChangedInCart = new Subject<Cart[]>();

  booksInCart: Cart[] = [];
  isCartEmpty = true;
  

  getBooksInCart() {

    return this.booksInCart.slice();
  }

  getBookInCart(index: number) {
    return this.booksInCart[index];
  }
  
  setBooksInCart(id: number, count: number) {

    this.booksInCart.push({id: id, count: count});
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  getSumBookCountInCart() {
    let sum = 0;
    this.booksInCart.forEach(element => {
      sum += element.count;
    });
    return sum;

  }

  increaseBookCountInCart(index: number) {
    const books = this.getBooksInCart()
    books[index].count += 1;
    this.booksChangedInCart.next(this.booksInCart.slice());
    console.log(books[index].count)
    return books[index].count

  }

  decreaseBookCountInCart(index: number) {
    const books = this.getBooksInCart()
    if(books[index].count > 1){
      books[index].count -= 1;
      this.booksChangedInCart.next(this.booksInCart.slice());
      return books[index].count
    }
    else{
      this.deleteBookFromCart(index)
      return 
    }

  }

  addBooksToCart(book: Cart) {

    const books = this.getBooksInCart()
    
    if(books.every((element) => element.id !== book.id)){
      this.booksInCart.push(book);
    }
  
    books.forEach((element, index) => {
      if(books[index].id === book.id){
        this.booksInCart[index].count += 1
      }
    });



    this.booksChangedInCart.next(this.booksInCart.slice());

  }

  updateBookinCart(index: number, newBook: Cart) {
    this.booksInCart[index] = newBook;
    this.booksChangedInCart.next(this.booksInCart.slice());
  }

  deleteBookFromCart(index: number) {
    this.booksInCart.splice(index, 1);
    this.booksChangedInCart.next(this.booksInCart.slice());
  }
}
