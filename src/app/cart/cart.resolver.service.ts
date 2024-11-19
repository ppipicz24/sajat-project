import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { CartService } from "./cart.service";
import { Cart } from "./cart.model";
import { BooksService } from "../books/books.service";

@Injectable({providedIn: 'root'})
export class CartResolverService implements Resolve<Cart[]>{
    constructor(private dataStorage: DataStorageService, private cartService: CartService, private booksService: BooksService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const cart =  this.cartService.getBooksInCart()

        if(cart.length === 0 ){
            return this.dataStorage.fetchBooksFromCart()        
        }
    }

}