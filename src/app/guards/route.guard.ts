import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RouteGuard implements CanActivate {
	constructor(private authS: AuthService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authS.$usr.pipe(
			take(1),
			// true if user exists, false is null or undefined
			map(user => !!user),
			tap(loggedIn => {
				if (!loggedIn) {
					this.router.navigateByUrl('/login');
				} else {
					// uE = 0:unchecked, 1:has username 2:no username
					this.authS.hasUsername.pipe(take(1)).subscribe(uE => {
						if (uE === 0) {
							// need to recheck at login or after a page refresh
							this.authS.usernameRegistered().then(() => {
								this.authS.hasUsername.pipe(take(1)).subscribe(uE2 => {
									if (uE2 === 1) {
										return state.url === '/username' ? this.router.navigateByUrl('/') : true;
									} else {
										this.router.navigateByUrl('/username');
									}
								});
							});
						} else if (uE === 2) this.router.navigateByUrl('/username');
					});
				}
			})
		);
	}
}
