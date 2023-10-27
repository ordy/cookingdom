import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {
	User,
	Auth,
	authState,
	signInWithEmailAndPassword,
	// setPersistence,
	// browserLocalPersistence,
	// browserSessionPersistence,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	user,
} from '@angular/fire/auth';
import { Firestore, getDoc, setDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public $usr: Observable<User>;

	public hasUsername = 'unchecked';

	public lastUserName: string;
	public loading = new Subject<boolean>();
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userState = new Subject<string>();
	public userEX: boolean;

	constructor(
		@Optional() private auth: Auth,
		private db: Firestore,
		private route: Router
	) {
		this.loading.next(false);
		this.$usr = user(auth);
		this.auth.onAuthStateChanged(user2 => {
			if (user2) {
				authState(this.auth).subscribe(res => {
					if (res) {
						this.loggedIn.next(true);
						this.userState.next(res.uid);
					}
				});
			}
		});
	}

	public signOut(): void {
		this.loading.next(true);
		this.loggedIn.next(false);
		this.hasUsername = 'unchecked';
		localStorage.removeItem('inventory');
		this.loading.next(false);
		this.auth.signOut();
	}

	public SignIn(email: string, password: string /*, keepLocal: boolean*/): void {
		this.loading.next(true);
		// set login persistence state
		// const logState = keepLocal ? browserLocalPersistence : browserSessionPersistence;
		// setPersistence(this.auth, browserSessionPersistence)
		// 	.then(() => {
		signInWithEmailAndPassword(this.auth, email, password)
			.then(() => {
				this.loggedIn.next(true);
				this.loading.next(false);
				this.route.navigateByUrl('/');
			})
			.catch(error => {
				window.alert(error.message);
				this.loading.next(false);
			});
		// })
		// .catch(error => {
		// 	window.alert(error.message);
		// });
	}

	public signUp(mail: string, password: string): void {
		createUserWithEmailAndPassword(this.auth, mail, password).then(() => {
			this.route.navigateByUrl('/username');
		});
	}

	private async providerSignIn(provider: GoogleAuthProvider | FacebookAuthProvider): Promise<void> {
		this.loading.next(true);
		try {
			await signInWithPopup(this.auth, provider);
			this.route.navigateByUrl('/');
		} catch (error) {
			this.loading.next(false);
			throw new Error(error);
		}
		this.loading.next(false);
	}

	public async googleSignIn() {
		const provider = new GoogleAuthProvider();
		const parameters = { prompt: 'select_account' };
		provider.setCustomParameters(parameters);
		this.providerSignIn(provider);
	}

	public async facebookSignIn() {
		const provider = new FacebookAuthProvider();
		const parameters = { dislpay: 'popup' };
		provider.setCustomParameters(parameters);
		this.providerSignIn(provider);
	}

	public get isLoggedIn(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	public get isLoading(): Observable<boolean> {
		return this.loading.asObservable();
	}

	public get userUID(): string {
		return this.auth.currentUser.uid;
	}

	public async usernameRegistered(uid: string) {
		const userRef = doc(this.db, 'users', uid);
		const res = await getDoc(userRef);
		if (res.exists()) {
			return (this.hasUsername = 'registered');
		} else {
			return (this.hasUsername = 'unregistered');
		}
	}

	public async usernameTaken(username: string) {
		if (username.length >= 3 && username !== this.lastUserName) {
			this.lastUserName = username;
			const usersRef = doc(this.db, 'usernames/', username.toLocaleLowerCase());
			const docSnap = await getDoc(usersRef);
			return docSnap.exists();
		}
	}

	public async saveUsername(uname: string) {
		const userID = this.userUID;
		await setDoc(doc(this.db, 'users', userID), { username: uname }).catch(error => window.alert(error.message));
		await setDoc(doc(this.db, 'usernames', uname.toLocaleLowerCase()), { uid: userID }).catch(error =>
			window.alert(error.message)
		);
		this.hasUsername = 'registered';
		this.route.navigateByUrl('/');
	}
}
