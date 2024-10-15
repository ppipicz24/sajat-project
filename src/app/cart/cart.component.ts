import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../books/books.model';
import { Subscription } from 'rxjs';
import { Cart } from './cart.model';
import { BooksService } from '../books/books.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  sub: Subscription
  userSub: Subscription

  cartItems: Cart[] = []
  countPerItem: number[] = []
  id: number
  cart: Book[] = []
  cartKiirni: Book[] = []
  sumPerItem: number[] = []

  isCartEmpty = true
  isAuth = false

  

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private bookService: BooksService, private dataStore: DataStorageService, private authService: AuthService) {
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

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });

   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
    this.userSub.unsubscribe()
   }

   increaseBookCount(index: number){
      this.countPerItem[index] = this.cartService.increaseBookCountInCart(index)
      this.sumPerItem[index] = this.cartKiirni[index].price * this.countPerItem[index]
      this.dataStore.storeBooksToCart()

    }

    decreaseBookCount(index: number){

      if(this.countPerItem[index] === 1){
        this.removeFromCart(index)
        return
      }

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

    sumPrice(){
      this.sumPerItem = []
      let sum = 0
      this.cartKiirni.forEach((book, i)=>{
        this.sumPerItem[i] = book.price * this.countPerItem[i]
        sum += this.sumPerItem[i]
      })
      return sum
    }

    onOrder(){
      if(!this.isAuth){
        this.router.navigate(['/auth'])
      }else{
        console.log('Ordering...')

      }
    }



}
