import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService as AuthSocialService, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

import {AuthService} from '../../../providers';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    submitted = false;
    registerForm: FormGroup;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private authSocialService: AuthSocialService,
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            password: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const user = {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            email: this.f.email.value.toLowerCase(),
            password: this.f.password.value
        };

        this.authService.register(user)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.status === 'success') {
                        this.router.navigate(['login']);
                    } else {
                        this.error = res.status;
                    }
                },
                error => {
                    this.error = error.error.message;
                });
    }

    signUpWithGoogle() {
        // this.authSocialService
        this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            this.authService.signUpWithGoogle(user).subscribe(
                res => {
                    if (res.status === 'success') {
                        this.router.navigate(['login']);
                    } else {
                        this.error = res.status;
                    }
                },
                error => {
                    this.error = error.error.message;
                });
        });
    }

    signUpWithFacebook() {
        this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
            this.authService.signUpWithFacebook(user).subscribe(
                res => {
                    if (res.status === 'success') {
                        this.router.navigate(['login']);
                    } else {
                        this.error = res.status;
                    }
                },
                error => {
                    this.error = error.error.message;
                }
            )
        })

    }
}
