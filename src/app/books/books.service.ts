import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "./books.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class BooksService {
    booksChanged = new Subject<Book[]>();

    books: Book[] = []

    constructor() {}

    getBooks(){
        return this.books.slice();
    }

    getBook(index: number){
        return this.books[index];
    }

    setBooks(books: Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice());
    }

    addBook(book: Book){
        this.books.push(book);
        this.booksChanged.next(this.books.slice());
    }

    updateBook(index: number, newBook: Book){
        this.books[index] = newBook;
        this.booksChanged.next(this.books.slice());
    }

    deleteBook(index: number){
        this.books.splice(index, 1);
        this.booksChanged.next(this.books.slice());
    }


}