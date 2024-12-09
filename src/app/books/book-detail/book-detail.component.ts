import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../books.service';
import { Book } from '../books.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { FavouriteService } from '../../favourites/favourites.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  book:Book

  paramSub: Subscription
  userSub: Subscription

  id:number
  countCartItems: number
  isFavorite: boolean 
  isAuth = false

  constructor(private dialog: MatDialogRef<BookDetailComponent>, private bookService: BooksService, @Inject(MAT_DIALOG_DATA) public data: any, private cartService:CartService, private dataStore: DataStorageService, private favouriteService: FavouriteService, private auth: AuthService, private router: Router){} //mat dialog data is used to pass data from one component to another

  ngOnInit(){
    this.id = this.data.index
    this.book = this.bookService.getBook(this.id)
    this.isFavorite = this.favouriteService.getFavourites().find(fav => fav.id === this.book.id) ? true : false

    this.userSub = this.auth.user.subscribe(user => {
      this.isAuth = !!user;
    })
  }
  
  close()
  {
    this.dialog.close();
  }

  addToCart(){
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    this.cartService.addBooksToCart({ id: this.book.id, count: 1})
    this.dataStore.storeBooksToCart()
  }

  onFavorite(){
    if(this.isAuth){
      
      this.isFavorite = !this.isFavorite
      if(this.isFavorite){
        this.isFavorite = true
        this.favouriteService.addBooksToFavourites(this.book)
        this.dataStore.storeFavourites()
      }
      else{
        this.isFavorite = false
        this.favouriteService.deleteFavourite(this.id)
        this.dataStore.storeFavourites()
      }
    }
    else{
      this.router.navigate(['/auth'])
    }
  }

  // ngOnDestroy(){
  //   this.paramSub.unsubscribe();
  // }
}
