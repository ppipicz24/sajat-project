import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favourite } from './favourites.model';
import { Book } from '../books/books.model';
import { FavouriteService } from './favourites.service';
import { BooksService } from '../books/books.service';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../books/book-detail/book-detail.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit, OnDestroy {
  sub: Subscription
  userSub: Subscription

  favItems: Favourite[] = []
  id: number
  books: Book[] = []
  book: Book
  favKiirni: Book[] = []
  countCartItems: number


  isFavEmpty = true
  isAuth = false

  constructor(private favouriteService: FavouriteService, private bookService: BooksService, private route: ActivatedRoute, private dataStore: DataStorageService, private authService: AuthService, private cartService: CartService, private dialog: MatDialog) {
    this.favItems = this.favouriteService.getFavourites()
    this.books = this.bookService.getBooks()
  }

  ngOnInit(): void {
    this.sub = this.favouriteService.booksChangedInFavourites.subscribe((favourites:Favourite[])=>{
      this.favItems = favourites
      })

    this.book = this.bookService.getBook(this.id)
    this.countCartItems = this.cartService.getBooksInCart().length

      this.books.forEach((book, i)=> {
        this.favItems.forEach((favItem, j)=>{
          if(book.id === favItem.id){
            this.favKiirni.push(book)
          }
        })
      })
       //load initial books in cart
       this.favItems = this.favouriteService.getFavourites()

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  addToCart(index: number){
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    this.cartService.addBooksToCart({ id: this.favItems[index].id, count: 1})
    this.dataStore.storeBooksToCart()
  }

  openDialog(index: number){
    this.dialog.open(BookDetailComponent, {data: {index: index}, disableClose: true})
  }

  deleteFavorite(index: number){
    this.favouriteService.deleteFavourite(index)
    this.favKiirni.splice(index, 1)
    this.dataStore.storeFavourites()
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
      this.userSub.unsubscribe()
  }
}
