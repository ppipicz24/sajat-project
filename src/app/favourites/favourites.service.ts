import { Injectable } from "@angular/core";
import { Favourite } from "./favourites.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class FavouriteService{
    booksChangedInFavourites = new Subject<Favourite[]>();
    booksInFavourites: Favourite[] = []
    isFavouritesEmpty = true;

    getFavourites(){
        return this.booksInFavourites.slice();
    }

    getFavourite(index: number){
        return this.booksInFavourites[index];
    }

    setFavourite(id: number){
        this.booksInFavourites.push({id: id})
        this.booksChangedInFavourites.next(this.booksInFavourites.slice())
    }

    deleteFavourite(index: number){
        this.booksInFavourites.splice(index, 1)
        this.booksChangedInFavourites.next(this.booksInFavourites.slice())
    }


}