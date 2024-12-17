import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit, OnDestroy {
  search: string

  isAuthenticated = false;
  private userSub: Subscription;
  count = 0;
  cartItems = []
  cartSub: Subscription
  isCartEmpty = true

  filteredBooks = []

  constructor(private authService: AuthService, private cartService: CartService, private bookService: BooksService  ){
    this.cartItems = this.cartService.getBooksInCart()
    this.filteredBooks = this.bookService.getBooks()

  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.cartSub = this.cartService.booksChangedInCart.subscribe((booksInCart)=>{
      this.cartItems = booksInCart

      if(this.cartItems.length > 0){
        this.isCartEmpty = false
      }
      else{
        this.isCartEmpty = true
      }

      this.count = this.isCartEmpty ? 0 : this.cartService.getSumBookCountInCart()

    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  onSearch(searchTerm: string){
    this.filteredBooks = this.bookService.filterBooks(searchTerm)
  }
}
