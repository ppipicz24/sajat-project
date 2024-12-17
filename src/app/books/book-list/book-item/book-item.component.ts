import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../../book-detail/book-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import { FavouriteService } from '../../../favourites/favourites.service';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { BooksService } from '../../books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit {
 @Input() book: Book
 @Input() index: number

 id: number
 countCartItems: number
 isFavorite: boolean //= false
 isAuth = false
 isFiltered = false


 userSub: Subscription

 constructor(public dialog: MatDialog, private route: ActivatedRoute, private cartService: CartService, private dataStore: DataStorageService, private favouriteService: FavouriteService, private auth: AuthService,private router: Router, private bookService:BooksService){
 }
 
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.isFavorite = this.favouriteService.getFavourites().find(fav => fav.id === this.book.id) ? true : false
    
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  openDialog(index: number){
    this.dialog.open(BookDetailComponent, {data: {index: index}, disableClose: true})
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

  addToCart(){
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    this.cartService.addBooksToCart({ id: this.book.id, count: 1})
    this.dataStore.storeBooksToCart()
  }

  onDelete(){
    this.bookService.deleteBook(this.index)
    this.dataStore.storeBooks()
  }

}