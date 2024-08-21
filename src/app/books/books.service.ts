import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "./books.model";

@Injectable()
export class BooksService {
    booksChanged = new Subject<Book[]>();

    books: Book[] = []

    constructor() {}

    getBooks(){
        return this.books.slice();
    }

    setBooks(books: Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice());
    }
    

}