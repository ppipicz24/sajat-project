import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { FavouriteService } from "./favourites.service";
import { BooksService } from "../books/books.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn: 'root'})
export class FavouritesResolverService{
    constructor(private dataStorage: DataStorageService, private favouriteService: FavouriteService, private bookService: BooksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const favourites =  this.favouriteService.getFavourites()
        const books = this.bookService.getBooks()

        if(favourites.length === 0 ){
            return this.dataStorage.fetchFavourite()        
        }
    }
    
}