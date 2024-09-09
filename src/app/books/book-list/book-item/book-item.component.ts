import { Component, Input } from '@angular/core';
import { Book } from '../../books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../../book-detail/book-detail.component';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
 @Input() book: Book
 @Input() index: number

 constructor(public dialog: MatDialog){}
 
  openDialog(index: number){
    this.dialog.open(BookDetailComponent, {data: {index: index}, disableClose: true})
  }
}