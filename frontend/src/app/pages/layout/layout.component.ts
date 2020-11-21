import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../providers';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    currentUser: any;
    navLinks: any[];
    public isLoggedIn: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.navLinks = [
            {
                label: 'Member Management',
                link: '/dashboard',
                index: 0
            }, {
                label: 'Patient Management',
                link: '/patient',
                index: 1
            }
        ];
    }

    ngOnInit() {
        this.authService.currentUserSubject.subscribe(currentUser => {
            this.currentUser = currentUser;
            if (this.currentUser) {
                this.isLoggedIn = true;
            }
        });
    }

    gotoLogin() {
        // this.isLoggedIn = true;
        this.router.navigate(['/login']);
    }

    gotoRegister() {
        this.router.navigate(['/signup']);
    }

    logout() {
        // this.authService.logout();
        this.isLoggedIn = false;
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
