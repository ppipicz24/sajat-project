import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    token: string = null;
    private tokenExpirationTimer: any;

    constructor(private http:HttpClient, private router:Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJm5gcz3HQhs6w4R6J58Rh3rofzTyV8-s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
        .pipe(catchError(this.handleError), tap(responseData=>{

            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }))
    }

    /*login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJm5gcz3HQhs6w4R6J58Rh3rofzTyV8-s',
            {
                password: password,
                email: email,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(responseData=>{
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }))
    }*/

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer=null;
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'Ez az email már létezik';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Ez az email még nem létezik';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'A jelszó nem megfelelő';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Hibás bejelentkezési adatok';
                break;
        }
        console.log(errorResponse);
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate= new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(email, userId, token, expirationDate);
        
        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin(){

        const userData:{
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser= new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate)); 

        if(loadedUser.token){

            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    autoLogout(expirationTime: number){
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logout();
        }, expirationTime)
    }




}
