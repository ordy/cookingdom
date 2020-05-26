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
  public usernameExist: boolean;
  public lastUserName: string;
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
    this.fireAuth.signOut();
    this.loggedIn.next(false);
    this.user = null;
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
    this.usernameExist = await this.userDeclared();
    if (this.usernameExist)
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

  async userDeclared() {
    const userID = auth().currentUser.uid;
    const usersRef = this.db.firestore.collection('users').doc(userID);
    return usersRef.get().then(user => {
      return user.data().usernamse != null ? true : false;
    });
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
    console.log(a);
  }
}
