import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService as AuthSocialService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import * as jwt_decode from 'jwt-decode';

import {AuthService} from '../../../providers';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    submitted = false;
    loginForm: FormGroup;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private authSocialService: AuthSocialService
    ) {
        if (this.authService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['dashboard']);
                },
                error => {
                    this.error = error.error.message;
                });
    }

    loginWithGoogle() {
        this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            console.log('user with google  >>>> ', user);
            this.authService.loginWithGoogle(user).pipe(first()).subscribe(
                res => {
                    this.router.navigate(['dashboard']);
                },
                error => {
                    this.error = error.error.message;
                });
        });
    }

    loginWithFacebook() {
        this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
            console.log('user with facebook  >>>> ', user);
            this.authService.loginWithFacebook(user).pipe(first()).subscribe(
                res => {
                    this.router.navigate(['dashboard']);
                },
                error => {
                    this.error = error.error.message;
                });
        });
    }
}
