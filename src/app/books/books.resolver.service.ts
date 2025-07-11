import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Book } from "./books.model";
import { DataStorageService } from "../shared/data-storage.service";
import { BooksService } from "./books.service";

@Injectable({providedIn: 'root'})
export class BooksResolverService implements Resolve<Book[]>{
    constructor(private dataStorage: DataStorageService, private bookService: BooksService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const books =  this.bookService.getBooks()
        // let's check if we have books in our service
        if(books.length === 0){
            return this.dataStorage.fetchBooks()          
        }
    }

}