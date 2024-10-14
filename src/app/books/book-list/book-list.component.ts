import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../books.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy{
  books: Book[] = []
  sub: Subscription
  isAuthenticated = false
  private userSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BooksService,  private authService: AuthService
  ) {
    this.books = this.bookService.getBooks()
  }
  
  ngOnInit(): void {
    this.sub = this.bookService.booksChanged.subscribe((books: Book[]) => {
      this.books = books
    })

    
    //load initial books
    this.books = this.bookService.getBooks()

    //subscribe to auth changes 
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onNewBook(){
    this.router.navigate(['../new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.userSub.unsubscribe();
  }

}
