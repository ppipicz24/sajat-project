import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent{ //implements OnInit, OnDestroy {
  // books: Book[] = []
  // sub: Subscription

  // constructor(private router: Router, private route: ActivatedRoute, private bookService: BooksService ) {
  //   this.books = this.bookService.getBooks()
  // }

  // ngOnInit(): void {
  //   this.sub = this.bookService.booksChanged.subscribe((books: Book[]) => {
  //     this.books = books
  //   })

  //   this.books = this.bookService.getBooks()
  // }

  // onNewBook(){
  //   this.router.navigate(['new'], {relativeTo: this.route})
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe()
  // }

}
