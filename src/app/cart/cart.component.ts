import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../books/books.model';
import { Subscription } from 'rxjs';
import { Cart } from './cart.model';
import { BooksService } from '../books/books.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: Cart[] = []
  sub: Subscription
  countPerItem: number[] = []
  id: number
  cart: Book[] = []
  cartKiirni: Book[] = []
  sumPerItem: number[] = []
  isCartEmpty = true

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private bookService: BooksService, private dataStore: DataStorageService) {
    this.cartItems = this.cartService.getBooksInCart()
    this.cart = this.bookService.getBooks()
  }
  
  ngOnInit(): void {
    this.sub = this.cartService.booksChangedInCart.subscribe((booksInCart:Cart[])=>{
      this.cartItems = booksInCart
      })

      this.cart.forEach((book, i)=> {
        this.cartItems.forEach((cartItem, j)=>{
          if(book.id === cartItem.id){
            this.cartKiirni.push(book)
          }
          this.countPerItem[j] = cartItem.count
        })
      })
       //load initial books in cart
       this.cartItems = this.cartService.getBooksInCart()

   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
   }

   increaseBookCount(index: number){
      this.countPerItem[index] = this.cartService.increaseBookCountInCart(index)
      this.sumPerItem[index] = this.cartKiirni[index].price * this.countPerItem[index]
      this.dataStore.storeBooksToCart()
    }

    decreaseBookCount(index: number){
      this.countPerItem[index]=this.cartService.decreaseBookCountInCart(index)
      this.sumPerItem[index] = this.cartKiirni[index].price * this.countPerItem[index]
      this.dataStore.storeBooksToCart()
    }

    removeFromCart(index: number){
      this.cartService.deleteBookFromCart(index)
      this.cartItems = this.cartService.getBooksInCart()
      this.cartKiirni.splice(index, 1)
      this.dataStore.storeBooksToCart()
    }



}
