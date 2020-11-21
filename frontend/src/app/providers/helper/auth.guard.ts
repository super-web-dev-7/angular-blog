import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '..';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log('current User >>>>', currentUser);
        if (currentUser) {
            // if (route.data.roles &&  route.data.roles.indexOf(currentUser.role) === -1) {
            //     await this.router.navigate(['/login']);
            //     return false;
            // }
            return true;
        }
        // not logged in so redirect to login page with the return url
        await this.router.navigate(['/login']);
        return false;
    }
}
