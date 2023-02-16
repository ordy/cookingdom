import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	public saveLogin = false;
	public googleIcon = faGoogle;
	public fbIcon = faFacebook;
	public isLoading: boolean;

	constructor(private authS: AuthService, private recaptchaV3Service: ReCaptchaV3Service) {}

	ngOnInit(): void {
		this.authS.isLoading.subscribe(loading => (this.isLoading = loading));
	}

	public signIn(form: NgForm): void {
		const email: string = form.value.email;
		const password: string = form.value.password;
		this.recaptchaV3Service.execute('SignIn').subscribe({
			next: (token: string) => {
				console.debug(`Token [${token}] generated`);
				this.authS.SignIn(email, password, this.saveLogin);
				form.reset();
			},
			error: (error: string) => {
				console.log(error);
			},
		});
	}

	public googleSign(): void {
		this.recaptchaV3Service.execute('googleSign').subscribe((token: string) => {
			console.debug(`Token [${token}] generated`);
			this.authS.googleSignIn();
		});
	}

	public facebookSign(): void {
		this.recaptchaV3Service.execute('facebookSign').subscribe((token: string) => {
			console.debug(`Token [${token}] generated`);
			this.authS.facebookSignIn();
		});
	}
}
