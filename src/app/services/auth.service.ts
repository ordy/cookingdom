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
	user,
} from '@angular/fire/auth';
import { Firestore, getDoc, setDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public $usr: Observable<User>;

	// Flags to check if user has a username
	// 0:unchecked, 1:has username 2:no username
	public hasUsername = new Subject<number>();

	public lastUserName: string;
	public loading = new Subject<boolean>();
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userState = new Subject<string>();

	constructor(@Optional() private auth: Auth, private db: Firestore, private route: Router) {
		this.loading.next(false);
		this.$usr = user(auth);
		this.auth.onAuthStateChanged(user2 => {
			if (user2) {
				authState(this.auth).subscribe(res => {
					if (res) {
						this.loggedIn.next(true);
						this.hasUsername.next(0);
						this.userState.next(res.uid);
					}
				});
			}
		});
	}

	public signOut(): void {
		this.loading.next(true);
		this.loggedIn.next(false);
		this.hasUsername.next(0);
		localStorage.removeItem('inventory');
		this.auth.signOut();
		this.loading.next(false);
	}

	public SignIn(email: string, password: string, keepLocal: boolean): void {
		this.loading.next(true);
		// set login persistence state
		const logState = keepLocal ? browserLocalPersistence : browserSessionPersistence;
		setPersistence(this.auth, logState)
			.then(() => {
				return signInWithEmailAndPassword(this.auth, email, password)
					.then(() => {
						this.loggedIn.next(true);
						this.hasUsername.next(1);
						this.loading.next(false);
						this.route.navigateByUrl('/');
					})
					.catch(error => {
						window.alert(error.message);
						this.loading.next(false);
					});
			})
			.catch(error => {
				window.alert(error.message);
			});
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

	public async usernameRegistered() {
		return authState(this.auth).subscribe(async usr => {
			if (usr != null) {
				const userRef = doc(this.db, 'users', usr.uid);
				return getDoc(userRef).then(x => {
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
			}
		});
	}

	public async usernameTaken(username: string) {
		if (username.length >= 3 && username !== this.lastUserName) {
			this.lastUserName = username;
			const usersRef = doc(this.db, 'usernames/', username);
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
		this.hasUsername.next(1);
		this.route.navigateByUrl('/');
	}
}
