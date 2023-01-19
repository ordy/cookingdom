import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, auth } from 'firebase/compat/app';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: User;

	// Flags to check if user has a username
	// 0:unchecked, 1:has username 2:no username
	public usernameExist = new BehaviorSubject<number>(0);

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
		});
	}

	signOut() {
		this.loading.next(true);
		this.fireAuth.signOut();
		this.loggedIn.next(false);
		this.user = null;
		this.usernameExist.next(0);
		this.route.navigateByUrl('/login');
		this.loading.next(false);
	}

	async SignIn(username: string, password: string, keepLocal: boolean) {
		// set persistence state if user wants to stay logged in
		this.loading.next(true);
		const logState = keepLocal ? 'local' : 'session';
		this.fireAuth.setPersistence(logState);
		// Auth and redirection to homepage
		return this.fireAuth
			.signInWithEmailAndPassword(username, password)
			.then(() => {
				this.loggedIn.next(true);
				this.usernameExist.next(1);
				this.loading.next(false);
				this.route.navigateByUrl('/');
			})
			.catch(error => {
				window.alert(error.message);
				this.loading.next(false);
			});
	}

	signUp(uname: string, mail: string, password: string) {
		this.fireAuth.createUserWithEmailAndPassword(mail, password).then(() => {
			this.saveUsername(uname);
		});
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
		if (this.usernameExist.value === 1) this.route.navigateByUrl('/');
		else this.route.navigateByUrl('/username');
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

	get currentUID(): string {
		return auth().currentUser.uid;
	}

	async userDeclared() {
		if (this.loggedIn.value) {
			const userID = auth().currentUser.uid;
			const userRef = this.db.firestore.collection('users').doc(userID);
			return userRef.get().then(user => {
				if (user.exists && user.data().username != null) {
					this.usernameExist.next(1);
					return true;
				} else {
					this.usernameExist.next(2);
					return false;
				}
			});
		} else {
			return this.loggedIn.value;
		}
	}

	async usernameTaken(username: string) {
		if (username.length >= 3 && username !== this.lastUserName) {
			this.lastUserName = username;
			const usersRef = this.db.firestore.collection('usernames').doc(username);
			return usersRef
				.get()
				.then(doc => {
					return !doc.exists ? true : false;
				})
				.catch(error => {
					window.alert(error.message);
				});
		}
	}

	async saveUsername(uname: string) {
		const userID: string = auth().currentUser.uid;
		await this.db
			.collection('users')
			.doc(userID)
			.set({
				username: uname,
			})
			.catch(error => {
				window.alert(error.message);
			});
		await this.db
			.collection('usernames')
			.doc(uname.toLowerCase())
			.set({
				uid: userID,
			})
			.catch(error => {
				window.alert(error.message);
			});
		this.usernameExist.next(1);
		this.route.navigateByUrl('/');
	}
}
