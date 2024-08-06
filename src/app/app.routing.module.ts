import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule{}