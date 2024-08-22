import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BooksService } from "../books/books.service";
import { tap } from "rxjs";
import { Book } from "../books/books.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private bookService: BooksService){}
    
    storeBooks()
    {
        const books = this.bookService.getBooks()

        this.http.put('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/books.json', books).subscribe(responseData =>{
            console.log(responseData)
        })
    }

    fetchBooks()
    {
        this.http.get<Book[]>('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/books.json').pipe(tap(books=>{
            return books.map(book =>{
                return {
                    ...book
                }
            })
        }),
        tap(books=>{
            this.bookService.setBooks(books)
        })
    )
    }
}

