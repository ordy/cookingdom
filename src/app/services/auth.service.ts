import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {
	User,
	Auth,
	authState,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, getDoc, setDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: User;

	// Flags to check if user has a username
	// 0:unchecked, 1:has username 2:no username
	public hasUsername = new BehaviorSubject<number>(0);

	public lastUserName: string;
	public loading = new BehaviorSubject<boolean>(false);
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userState = new Subject<string>();

	constructor(@Optional() private auth: Auth, private db: Firestore, private route: Router) {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				this.loggedIn.next(true);
				authState(this.auth).subscribe(res => {
					this.userState.next(res.uid);
					this.user = res;
				});
			}
		});
	}

	public signOut(): void {
		this.loading.next(true);
		this.auth.signOut();
		this.loggedIn.next(false);
		this.user = null;
		this.hasUsername.next(0);
		this.route.navigateByUrl('/');
		this.loading.next(false);
	}

	public SignIn(email: string, password: string, keepLocal: boolean): void {
		this.loading.next(true);
		// set login persistence state
		const logState = keepLocal ? browserLocalPersistence : browserSessionPersistence;
		setPersistence(this.auth, logState);

		signInWithEmailAndPassword(this.auth, email, password)
			.then(() => {
				this.loggedIn.next(true);
				this.hasUsername.next(1);
				this.loading.next(false);
				this.route.navigateByUrl('/home');
			})
			.catch(err => {
				window.alert(err.message);
				this.loading.next(false);
			});
	}

	public signUp(uname: string, mail: string, password: string): void {
		createUserWithEmailAndPassword(this.auth, mail, password).then(() => {
			this.saveUsername(uname);
		});
	}

	public async providerSignIn(providerName: string): Promise<void> {
		this.loading.next(true);
		let provider: GoogleAuthProvider | FacebookAuthProvider;
		let parameters: {};
		switch (providerName) {
			case 'google':
				provider = new GoogleAuthProvider();
				parameters = { prompt: 'select_account' };
				break;
			case 'facebook':
				provider = new FacebookAuthProvider();
				parameters = { display: 'popup' };
				break;
			default:
				this.loading.next(false);
				throw new Error('Not a valid authentication provider.');
		}
		provider.setCustomParameters(parameters);
		try {
			await signInWithPopup(this.auth, provider);
		} catch (error) {
			this.loading.next(false);
			throw new Error(error);
		}
		// check if user has a registered username
		await this.usernameRegistered();
		if (this.hasUsername.value === 1) this.route.navigateByUrl('/');
		else this.route.navigateByUrl('/username');
		this.loading.next(false);
	}

	public get isLoggedIn(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	public get isLoading(): Observable<boolean> {
		return this.loading.asObservable();
	}

	public get userUID(): Observable<string> {
		return this.userState.asObservable();
	}

	public async usernameRegistered() {
		if (this.loggedIn.value) {
			authState(this.auth).subscribe(user => {
				const userRef = doc(this.db, 'users', user.uid);
				getDoc(userRef).then(x => {
					if (x.data().username != null) {
						// 1: user already has a username
						this.hasUsername.next(1);
						return true;
					} else {
						// 2: user has no username
						this.hasUsername.next(2);
						return false;
					}
				});
			});
		} else {
			console.log('Request denied to unauthorized user.');
			return this.loggedIn.value;
		}
	}

	async test(): Promise<void> {}

	public async usernameTaken(username: string) {
		if (username.length >= 3 && username !== this.lastUserName) {
			this.lastUserName = username;
			const usersRef = doc(this.db, 'usernames/', username);
			const docSnap = await getDoc(usersRef);
			return docSnap.exists();
		}
	}

	public async saveUsername(uname: string) {
		const userID = this.user.uid;
		await setDoc(doc(this.db, 'users', userID), { username: uname }).catch(error => window.alert(error.message));
		await setDoc(doc(this.db, 'usernames', uname.toLocaleLowerCase()), { uid: userID }).catch(error =>
			window.alert(error.message)
		);
		this.hasUsername.next(1);
		this.route.navigateByUrl('/');
	}
}
