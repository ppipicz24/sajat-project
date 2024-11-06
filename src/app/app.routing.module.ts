import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { BooksComponent } from "./books/books.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { BooksResolverService } from "./books/books.resolver.service";
import { CartComponent } from "./cart/cart.component";
import { CartResolverService } from "./cart/cart.resolver.service";
import { FavouritesResolverService } from "./favourites/favourites.resolver";

const appRoutes: Routes = [
    {path: '', redirectTo: '/books', pathMatch: 'full'},
    {path: 'books', component: BooksComponent, resolve:[BooksResolverService, CartResolverService], children: [
        
        // {path: '', component: BooksComponent},
        {path: ':id', component: BookDetailComponent},
    ]
},
    {path: 'new', component: BookEditComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'favourites', component: FavouritesComponent, resolve: [BooksResolverService, FavouritesResolverService]},
    {path: 'cart', component: CartComponent, resolve: [CartResolverService, BooksResolverService]}


]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}