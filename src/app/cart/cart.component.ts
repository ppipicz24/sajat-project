import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../books/books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: Book[] = []
  sub: Subscription
  countPerItem: number
  id: number

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router) {
    this.cartItems= this.cartService.getBooksInCart()
  }
  
  ngOnInit(): void {
    this.sub = this.cartService.booksChangedInCart.subscribe((booksInCart:Book[])=>{
      this.cartItems = booksInCart

      })

      for(let i = 0; i < this.cartItems.length; i++){
        this.id = i
        console.log(this.id)
      }

      this.CountPerItem(this.id)


       //load initial books in cart
       this.cartItems = this.cartService.getBooksInCart()
       console.log("Cart items")
       console.log(this.cartItems)

   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
   }

   CountPerItem(index: number){
      this.countPerItem = 0
      this.cartItems.forEach((item, i)=>{
        if(i === index){
          this.countPerItem = this.countPerItem + 1
        }
      
      })
      return this.countPerItem
    }








 


}
