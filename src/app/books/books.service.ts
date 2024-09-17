import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "./books.model";

@Injectable({providedIn: 'root'})
export class BooksService {
    booksChanged = new Subject<Book[]>();

    books: Book[] = []

    getBooks(){
        return this.books.slice();
    }

    getBook(index: number){
        return this.books[index];
    }

    setBooks(books: Book[]){
        if(books === null){
            return
        }
        this.books = books;
        this.booksChanged.next(this.books.slice());
    }

    addBook(book: Book){
        book.id = this.books.length + 1;
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