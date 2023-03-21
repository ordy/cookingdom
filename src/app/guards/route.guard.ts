import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class RouteGuard implements CanActivate {
	constructor(private authS: AuthService, private router: Router) {}

	canActivate() {
		if (this.authS.loggedIn.value) {
			return true;
		} else {
			this.router.navigateByUrl('/login');
			return false;
		}
	}
}
