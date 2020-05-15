import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  field: string;
  userData: any;
  public loading = new BehaviorSubject<boolean>(false);
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(public fireAuth: AngularFireAuth, public db: AngularFirestore, private route: Router) {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn.next(true);
        this.fireAuth.authState.subscribe(res => {
          this.user = res;
        });
      }
    })
  }

  signOut() {
    this.route.navigateByUrl('login');
    this.fireAuth.signOut();
    this.loggedIn.next(false);
    this.user = null;
  }

  async SignIn(username: string, password: string, keepLocal: boolean) {
    // set persistence state if user wants to stay logged in
    this.loading.next(true);
    const logState = keepLocal ? 'local' : 'session';
    this.fireAuth.setPersistence(logState);
    // Auth and redirection to homepage
    return this.fireAuth.signInWithEmailAndPassword(username, password)
      .then(() => {
        this.loggedIn.next(true);
        this.loading.next(false);
        this.route.navigateByUrl('');
      }).catch((error) => {
        window.alert(error.message);
        this.loading.next(false);
      })
  }

  signUp(username: string, email: string, password: string) {
    // signup function
    this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  testAddUser() {
    const collection = this.db.collection('users')
    const userID = '22222' // ID after created the user.
    collection.doc(userID).set({
      name: 'NewUserfromAngular', // some another information for user you could save it here.
      uid: userID     // you could save the ID as field in document.
    }).then(() => {
      console.log('done')
    })
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await this.fireAuth.signInWithPopup(provider);
    this.route.navigateByUrl('');
  }

  async facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    provider.setCustomParameters({ display: 'popup' });
    await this.fireAuth.signInWithPopup(provider);
    this.route.navigateByUrl('');
  }

  async providerSignIn(providerName: string) {
    switch (providerName) {
      case 'google':
        const gAuth = new auth.GoogleAuthProvider();
        gAuth.setCustomParameters({ prompt: 'select_account' });
        await this.fireAuth.signInWithPopup(gAuth);
        break;
      case 'facebook':
        const fbAuth = new auth.FacebookAuthProvider();
        fbAuth.setCustomParameters({ display: 'popup' });
        await this.fireAuth.signInWithPopup(fbAuth);
        break;
      default:
        throw new Error('Not a valid authentication provider.');
    }
    this.route.navigateByUrl('');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoading() {
    return this.loading.asObservable();
  }

  getValue() {
    this.fireAuth.authState.subscribe(res => {
      this.user = res;
    });
  }
}
