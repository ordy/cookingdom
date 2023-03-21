import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, of, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public hasUsername = 'unchecked';

	public lastUserName: string;
	public loading = new Subject<boolean>();
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userEX: boolean;

	constructor(@Optional() private auth: Auth, private route: Router) {}

	public signOut(): void {
		this.loading.next(true);
		this.loggedIn.next(false);
		of('logout')
			.pipe(delay(700))
			.subscribe(() => {
				this.loading.next(false);
			});
	}

	public async SignIn(): Promise<void> {
		this.loggedIn.next(true);
		this.loading.next(true);
		// faking server auth
		of('login')
			.pipe(delay(200))
			.subscribe(() => {
				this.loading.next(false);
				this.route.navigateByUrl('/');
			});
	}

	public get isLoggedIn(): Observable<boolean> {
		return this.loggedIn.asObservable();
	}

	public get isLoading(): Observable<boolean> {
		return this.loading.asObservable();
	}
}
