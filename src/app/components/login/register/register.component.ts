import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {
	UntypedFormGroup,
	UntypedFormBuilder,
	UntypedFormControl,
	Validators,
	AbstractControlOptions,
} from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	public googleIcon = faGoogle;
	public fbIcon = faFacebook;
	public mailIcon = faEnvelope;
	// regex: at least one lower, one upper, one special, 6 chars min-length
	private pwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*-_]{6,}$/;
	public debouncer: NodeJS.Timeout;

	private email = new UntypedFormControl('', [Validators.required, Validators.email]);
	private password = new UntypedFormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);
	private pwConfirm = new UntypedFormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);
	public signupForm = this.fb.group(
		{
			email: this.email,
			password: this.password,
			pwConfirm: this.pwConfirm,
		},
		{ validator: this.pwCheck } as AbstractControlOptions
	);

	constructor(public authS: AuthService, private fb: UntypedFormBuilder) {}

	ngOnInit(): void {}

	signUp() {
		const mail = this.signupForm.value.email;
		const pass = this.signupForm.value.password;
		this.authS.signUp(mail, pass);
	}

	pwCheck(form: UntypedFormGroup) {
		const pass = form.value.password;
		const confirmation = form.value.pwConfirm;
		if (pass === confirmation) {
			return null;
		} else {
			form.controls.pwConfirm.setErrors({ incorrect: true });
			return { notSame: true };
		}
	}

	displayTooltip() {
		const regX = new RegExp(this.pwPattern);
		return regX.test(this.password.value) ? false : true;
	}
}
