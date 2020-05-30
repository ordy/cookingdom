import { Injectable, IterableDiffers } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  public usernameExist = new BehaviorSubject<boolean>(false);
  public lastUserName: string;
  public loading = new BehaviorSubject<boolean>(false);
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(public fireAuth: AngularFireAuth, public db: AngularFirestore, private route: Router) {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('AUTH STATE CALL');
        // THIS IS TOO SLOW, NOT RESOLVED IN TIME
        /* this.userDeclared().then(x => {
          if (x) {
            this.usernameExist.next(true);
          }
        }); */

        this.usernameExist.next(true);
        this.loggedIn.next(true);
        this.fireAuth.authState.subscribe(res => {
          this.user = res;
        });
      }
    })
  }

  signOut() {
    this.fireAuth.signOut();
    this.loggedIn.next(false);
    this.user = null;
    this.usernameExist.next(false);
    this.route.navigateByUrl('/login');
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
        this.usernameExist.next(true);
        this.loading.next(false);
        this.route.navigateByUrl('/');
      }).catch((error) => {
        window.alert(error.message);
        this.loading.next(false);
      })
  }

  signUp(uname: string, mail: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(mail, password).then((usr) => {
      this.db.collection('users').doc(usr.user.uid).set({
        email: mail,
        username: uname
      });
      this.db.collection('usernames').doc((uname.toLowerCase())).set({
        uid: usr.user.uid
      }).catch(error => {
        window.alert(error.message);
        console.log('failed to add username');
      });
    });
    this.usernameExist.next(true);
    console.log('usernameExists: ', this.usernameExist.value);
  }

  async providerSignIn(providerName: string) {
    this.loading.next(true);
    let provider: auth.GoogleAuthProvider | auth.FacebookAuthProvider;
    let parameters: {};
    switch (providerName) {
      case 'google':
        provider = new auth.GoogleAuthProvider();
        parameters = { prompt: 'select_account' };
        break;
      case 'facebook':
        provider = new auth.FacebookAuthProvider();
        parameters = { display: 'popup' };
        break;
      default:
        this.loading.next(false);
        throw new Error('Not a valid authentication provider.');
    }
    provider.setCustomParameters(parameters);
    try {
      await this.fireAuth.signInWithPopup(provider);
    } catch (error) {
      this.loading.next(false);
      throw new Error(error);
    }
    // checking if user has a username
    await this.userDeclared();
    if (this.usernameExist.value)
      this.route.navigateByUrl('/');
    else {
      this.route.navigateByUrl('/username');
    }
    this.loading.next(false);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoading() {
    return this.loading.asObservable();
  }

  get isExist() {
    return this.usernameExist.asObservable();
  }

  async userDeclared() {
    if (this.loggedIn.value) {
      console.log('Calling userDeclared()');
      const userID = auth().currentUser.uid;
      const usersRef = this.db.firestore.collection('users').doc(userID);
      return usersRef.get().then(user => {
        if (user.data().username != null) {
          this.usernameExist.next(true);
          return true;
        } else {
          this.usernameExist.next(false);
          return false;
        }
      });
    } else {
      return this.loggedIn.value;
    }
  }

  async usernameTaken(username: string) {
    if ((username.length >= 3) && (username !== this.lastUserName)) {
      this.lastUserName = username;
      const usersRef = this.db.firestore.collection('usernames').doc(username);
      return usersRef.get().then(doc => {
        return !doc.exists ? true : false;
      }).catch(err => {
        console.log('Error getting document', err);
      });
    }
  }

  async test3() {
    const userID = auth().currentUser.uid;
    const usersRef = this.db.firestore.collection('users').doc(userID);
    return usersRef.get().then(doc => {
      let usr: string;
      usr = doc.data().username;
      return usr;
    })
  }

  async test() {
    const a = await this.test3();
    console.log(a, 'username');
  }
}
