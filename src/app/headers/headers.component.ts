import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BookItemComponent } from '../books/book-list/book-item/book-item.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  count = 0;

  constructor(private authService: AuthService,
  ){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    // this.count = this.bookItemComponent.countCartItems; 
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }


}
