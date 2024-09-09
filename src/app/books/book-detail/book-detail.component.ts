import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../books.service';
import { Book } from '../books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  book:Book
  paramSub: Subscription
  id:number

  constructor(private dialog: MatDialogRef<BookDetailComponent>, private bookService: BooksService, @Inject(MAT_DIALOG_DATA) public data: any ){} //mat dialog data is used to pass data from one component to another

  ngOnInit(){
    this.id = this.data.index
    this.book = this.bookService.getBook(this.id)
  }
  
  close()
  {
    this.dialog.close();
  }
}
