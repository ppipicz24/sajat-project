import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BooksService } from "../books/books.service";
import { count, tap } from "rxjs";
import { Book } from "../books/books.model";
import { CartService } from "../cart/cart.service";
import { Cart } from "../cart/cart.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private bookService: BooksService, private cartService: CartService){}

    
    
    storeBooks()
    {
        const books = this.bookService.getBooks()

        this.http.put('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/books.json', books).subscribe(responseData =>{
            console.log(responseData)
        })
    }

    fetchBooks()
    {
        return this.http.get<Book[]>('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/books.json').pipe(tap(books=>{
            return books ? books.map(book => ({ ...book })) : [];
        }),
        tap(books=>{
            this.bookService.setBooks(books)
        })
    )
    }

    deleteBooks(){
        return this.http.delete('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/books.json').subscribe(responseData =>{
            console.log(responseData)
        })
    }

    storeBooksToCart(){
        const books = this.cartService.getBooksInCart()

        this.http.put('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/cart.json', books).subscribe(responseData =>{
            console.log(responseData)
        })
    }

    // In your fetchBooksFromCart() method, adjust to match the structure:

    fetchBooksFromCart() {
        

        return this.http.get<Cart[]>('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/cart.json').pipe(tap(books=>{
            return books ? books.map(book => ({ ...[book.id] })) : [];
        }),
        tap(books=>{

            books.forEach(book=>{
                console.log(book)
                this.cartService.setBooksInCart(book.id, book.count)
            })
        }))
}

    deleteBooksFromCart(){
        return this.http.delete('https://own-project-fd626-default-rtdb.europe-west1.firebasedatabase.app/cart.json').subscribe(responseData =>{
            console.log(responseData)
        })
    }

}

