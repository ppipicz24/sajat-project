import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../books.service';
import { Book } from '../books.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  book:Book
  paramSub: Subscription
  id:number
  countCartItems: number

  constructor(private dialog: MatDialogRef<BookDetailComponent>, private bookService: BooksService, @Inject(MAT_DIALOG_DATA) public data: any, private cartService:CartService, private dataStore: DataStorageService){} //mat dialog data is used to pass data from one component to another

  ngOnInit(){
    this.id = this.data.index
    this.book = this.bookService.getBook(this.id)
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

  ngOnDestroy(){
    this.paramSub.unsubscribe();
  }
}
