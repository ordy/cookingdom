import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private authS: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authS.fireAuth.authState.pipe(
      take(1),
      // true if user exists, false is null or undefined
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn)
          this.router.navigateByUrl('/login');
        else {
          // uE = 0:no value, 1:has username 2:no username
          const uE = this.authS.usernameExist.value;
          if (uE === 0) {
            // rechecking at login or after a page refresh
            this.authS.userDeclared().then((name) => {
              if (name) {
                this.authS.usernameExist.next(1);
              } else {
                this.router.navigateByUrl('/username');
              }
            });
          }
          else if (uE === 2)
            this.router.navigateByUrl('/username');
        }
      })
    )
  }
}
