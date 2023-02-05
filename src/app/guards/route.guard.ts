import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RouteGuard implements CanActivate {
	constructor(private authS: AuthService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let uid: string;
		this.authS.loading.next(true);
		return this.authS.$usr.pipe(
			take(1),
			map(user => {
				if (user) uid = user.uid;
				return !!user; // true if user exists, false is null or undefined
			}),
			tap(loggedIn => {
				if (!loggedIn) {
					this.authS.loading.next(false);
					this.router.navigateByUrl('/login');
				} else if (this.authS.hasUsername === 'unchecked') {
					this.authS.usernameRegistered(uid).then(user => {
						this.authS.loading.next(false);
						if (user === 'registered') {
							if (state.url === '/username') {
								this.router.navigateByUrl('/');
							} else return true;
						} else {
							if (state.url !== '/username') this.router.navigateByUrl('/username');
							else return false;
						}
					});
				} else if (this.authS.hasUsername === 'unregistered') {
					this.authS.loading.next(false);
					if (state.url !== '/username') this.router.navigateByUrl('/username');
					else return false;
				} else {
					this.authS.loading.next(false);
				}
			})
		);
	}
}
