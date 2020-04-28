import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from  'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Session } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : User;
  field : string;
  userData : any;

  constructor(public fireAuth: AngularFireAuth, private route: Router) {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.fireAuth.authState.subscribe(res => {
          this.user = res;
        });
      } else {
        console.log('user is NOT signed in');
      }
    })
  }

  isLoggedIn() {
    this.fireAuth.authState.subscribe(res => {
      if (res === null){
        console.log('empty');
      }else{
        console.log('not empty');
      }
    })
  }

  currentUser(){
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('user is signed in');
        this.user = firebase.auth().currentUser;
       // console.log('user is',this.user);
      } else {
        console.log('user is NOT signed in');
      }
    })
   //  this.route.navigateByUrl('/recipes');
  }

  signOut(){
    this.fireAuth.signOut();
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
        this.route.navigateByUrl('');
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  getValue(){
    this.fireAuth.authState.subscribe(res => {
      this.user = res;
    });
  }
}
