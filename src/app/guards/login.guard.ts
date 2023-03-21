import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	constructor(private authS: AuthService, private router: Router) {}

	canActivate() {
		return this.authS.loggedIn.value ? false : true;
	}
}
