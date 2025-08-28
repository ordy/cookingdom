import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { NgForm } from '@angular/forms';
import { ScScoreReCaptcha } from '@semantic-components/re-captcha';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone: false,
})
export class LoginComponent implements OnInit {
	public saveLogin = false;
	public googleIcon = faGoogle;
	public fbIcon = faFacebook;
	public isLoading: boolean;
	private readonly scScoreReCaptcha = inject(ScScoreReCaptcha);

	constructor(
		private authS: AuthService,
	) {}

	ngOnInit(): void {
		this.authS.isLoading.subscribe(loading => (this.isLoading = loading));
	}

	public async signIn(form: NgForm): Promise<void> {
		const email: string = form.value.email;
		const password: string = form.value.password;
		const score = await this.scScoreReCaptcha.execute('SignIn');
		if (parseFloat(score) <= 0.3) {
			console.log('SCORE IS = ',score);
			this.authS.SignIn(email, password, this.saveLogin);
			form.reset();
		}else{
			console.log('SCORE IS BAD = ',score);
			console.log('reCAPTCHA score too low, login blocked');
		}
	}

	public async googleSign(): Promise<void> {
		const score = await this.scScoreReCaptcha.execute('googleSign');
		if (parseFloat(score) > 0.3) {
			console.log('SCORE IS = ',score);
			this.authS.googleSignIn();
		} else {
			console.log('SCORE IS BAD = ',score);
			console.log('reCAPTCHA score too low, login blocked');
		}
	}

	public async facebookSign(): Promise<void> {
		const score = await this.scScoreReCaptcha.execute('facebookSign');
		if (parseFloat(score) > 0.3) {
			console.log('SCORE IS = ',score);
			this.authS.facebookSignIn();
		} else {
			console.log('SCORE IS BAD = ',score);
			console.log('reCAPTCHA score too low, login blocked');
		}
	}
}
