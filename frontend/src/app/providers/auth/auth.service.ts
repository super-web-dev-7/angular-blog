import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import {UrlJSON} from '../../utils/UrlJson';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(
        private http: HttpClient,
    ) {
        if (localStorage.getItem('currentUser') != null) {
            this.currentUserSubject = new BehaviorSubject<any>(jwt_decode(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        } else {
            this.currentUserSubject = new BehaviorSubject<any>(null);
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${UrlJSON.loginUrl}`, {email, password})
            .pipe(map(response => {
                const user = jwt_decode(response.token);
                console.log(user)
                // login successful if there's a jwt token in the response
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', response.token);

                    this.currentUserSubject.next(jwt_decode(response.token));
                }
                return user;
            }));
    }

    loginWithGoogle(user) {
        return this.http.post<any>(`${UrlJSON.loginWithGoogleUrl}`, user)
            .pipe(map(response => {
                const user = jwt_decode(response.token);
                console.log(user)
                // login successful if there's a jwt token in the response
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', response.token);

                    this.currentUserSubject.next(jwt_decode(response.token));
                }
                return user;
            }))
    }

    loginWithFacebook(user) {
        return this.http.post<any>(`${UrlJSON.loginWithFacebook}`, user)
            .pipe(map(response => {
                const user = jwt_decode(response.token);
                console.log(user)
                // login successful if there's a jwt token in the response
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', response.token);

                    this.currentUserSubject.next(jwt_decode(response.token));
                }
                return user;
            }))
    }

    register(data) {
        return this.http.post<any>(`${UrlJSON.signupUrl}`, data)
            .pipe(map(response => {
                return response;
            }));
    }

    signUpWithGoogle(user) {
        return this.http.post<any>(`${UrlJSON.signUpWithGoogleUrl}`, user)
            .pipe(map(response => {
                return response;
            }));
    }

    signUpWithFacebook(user) {
        return this.http.post<any>(`${UrlJSON.signUpWithFacebookUrl}`, user)
            .pipe(map(response => {
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('lastPostedQuestion');
        this.currentUserSubject.next(null);
    }


}
