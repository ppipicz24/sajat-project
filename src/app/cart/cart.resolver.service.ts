import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { Book } from "../books/books.model";
import { CartService } from "./cart.service";

@Injectable({providedIn: 'root'})
export class CartResolverService implements Resolve<Book[]>{
    constructor(private dataStorage: DataStorageService, private cartService: CartService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const books =  this.cartService.getBooksInCart()

        if(books.length === 0){
            return this.dataStorage.fetchBooksFromCart()
        }
        else{
            return books
        }
    }

}