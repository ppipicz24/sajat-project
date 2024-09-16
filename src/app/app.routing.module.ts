import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { BooksComponent } from "./books/books.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { BooksResolverService } from "./books/books.resolver.service";

const appRoutes: Routes = [
    {path: '', redirectTo: '/books', pathMatch: 'full'},
    {path: 'books', component: BooksComponent, resolve:[BooksResolverService], children: [
        // {path: '', component: BooksComponent},
        {path: ':id', component: BookDetailComponent},
    ]
},
    {path: 'new', component: BookEditComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'favourites', component: FavouritesComponent}

]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}