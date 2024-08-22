import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub: Subscription;
  user: User

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });

    this.user = this.authService.user.value;
    console.log(this.user);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }
}
