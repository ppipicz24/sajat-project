import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { BooksComponent } from "./books/books.component";
import { FavouritesComponent } from "./favourites/favourites.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/books', pathMatch: 'full'},
    {path: 'books', component: BooksComponent, children: [
        {path: '', component: BooksComponent},
    ]
    },
    {path: 'auth', component: AuthComponent},
    {path: 'favourites', component: FavouritesComponent}

]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}