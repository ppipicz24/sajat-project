import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../../book-detail/book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { DataStorageService } from '../../../shared/data-storage.service';

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

 constructor(public dialog: MatDialog, private route: ActivatedRoute, private cartService: CartService, private dataStore: DataStorageService){}
 
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    console.log(this.book.id)
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    console.log(this.countCartItems)
  }


  openDialog(index: number){
    this.dialog.open(BookDetailComponent, {data: {index: index}, disableClose: true})
  }

  addToCart(){
    this.countCartItems = this.cartService.getBooksInCart().length + 1
    this.cartService.addBooksToCart({ id: this.book.id, count: 1})
    this.dataStore.storeBooksToCart()
    console.log(this.countCartItems)
    console.log(this.cartService.getBooksInCart())
  }
}