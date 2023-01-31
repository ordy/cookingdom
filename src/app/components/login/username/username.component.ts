import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-username',
	templateUrl: './username.component.html',
	styleUrls: ['./username.component.css'],
})
export class UsernameComponent implements OnInit {
	private usrPattern = /^[A-Za-z0-9]{3,20}$/;
	public username = new UntypedFormControl(
		'',
		[Validators.required, Validators.pattern(this.usrPattern)],
		this.usernameCheck.bind(this)
	);
	public usernameForm = this.fb.group({
		username: this.username,
	});
	public debouncer: any;
	private lastUsername: string;
	private userExists: ValidationErrors;

	constructor(public authS: AuthService, private fb: UntypedFormBuilder) {}

	ngOnInit(): void {}

	usernameCheck(username: UntypedFormControl): Promise<boolean> {
		// reseting debouce time on every validator call
		clearTimeout(this.debouncer);
		const promise = new Promise<any>((resolve, reject) => {
			this.debouncer = setTimeout(() => {
				if (username.value !== this.lastUsername) {
					this.lastUsername = username.value;
					const isTaken = this.authS.usernameTaken(username.value.toLowerCase());
					this.userExists = isTaken.then(res => {
						if (res) return { userExists: true };
						else return null;
					});
				}
				resolve(this.userExists);
			}, 1000);
		});
		return promise;
	}

	saveName(): void {
		this.authS.saveUsername(this.username.value);
	}

	validName(): boolean {
		const regX: RegExp = new RegExp(this.usrPattern);
		return regX.test(this.username.value) ? true : false;
	}
}
