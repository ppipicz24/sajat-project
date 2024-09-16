import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  count = 0;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
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
