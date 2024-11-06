import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../../book-detail/book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import { FavouriteService } from '../../../favourites/favourites.service';

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
 isFavorite: boolean = false

 constructor(public dialog: MatDialog, private route: ActivatedRoute, private cartService: CartService, private dataStore: DataStorageService, private favouriteService: FavouriteService){}
 
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })
    this.countCartItems = this.cartService.getBooksInCart().length + 1
  }


  openDialog(index: number){
    this.dialog.open(BookDetailComponent, {data: {index: index}, disableClose: true})
  }

  onFavorite(){
    this.isFavorite = !this.isFavorite

    if(this.isFavorite){
      this.isFavorite = true
      this.favouriteService.setFavourite(this.book.id)
      this.dataStore.storeFavourites()
    }
    else{
      this.isFavorite = false
      this.favouriteService.deleteFavourite(this.book.id)
      this.dataStore.storeFavourites()
    }


  }

  addToCart(){
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    this.cartService.addBooksToCart({ id: this.book.id, count: 1})
    this.dataStore.storeBooksToCart()
  }
}