import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from  'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : User;
  field : string;
  userData : any;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(public fireAuth: AngularFireAuth, private route: Router) {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn.next(true);
        this.fireAuth.authState.subscribe(res => {
          this.user = res;
        });
      } else {
        console.log('user is NOT signed in');
      }
    })
  }

  signOut(){
    this.fireAuth.signOut();
    this.loggedIn.next(false);
    this.user = null;
  }

  async SignIn(username: string, password: string, keepLocal: boolean) {
    // set persistence state if user wants to stay logged in
    if (keepLocal){
      this.fireAuth.setPersistence('local');
    }
    else{
      this.fireAuth.setPersistence('session');
    }
    // Auth and redirection to homepage
    return this.fireAuth.signInWithEmailAndPassword(username, password)
      .then((result) => {
        this.loggedIn.next(true);
        this.route.navigateByUrl('');
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();

    // return this.user != null ? true : false;
  }

  getValue(){
    this.fireAuth.authState.subscribe(res => {
      this.user = res;
    });
  }


}
