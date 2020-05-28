import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authS: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authS.fireAuth.authState.pipe(
      take(1),
      // false if user exists, true is null or undefined
      map(user => !user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Login Guard access denied.')
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
