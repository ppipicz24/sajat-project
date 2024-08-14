import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  error: string = null;
  
  constructor(private router: Router, private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }
    const email = form.value.email
    const password = form.value.password
    // const username = form.value.username

    let authObservable: Observable<AuthResponseData>

    if(this.isLoginMode){
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
      this.isLoginMode = true
    }

    authObservable.subscribe(
      (responseData) => {
        console.log(responseData)
        this.router.navigate(['/home'])
      },

    )

    form.reset();

  }


}
