import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

	constructor(private authS: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.authS.isLoading.subscribe(loading => (this.isLoading = loading));
	}

	signIn(form: NgForm) {
		const email: string = form.value.email;
		const password: string = form.value.password;
		this.authS.SignIn(email, password, this.saveLogin);
		form.reset();
	}

	googleSign() {
		this.authS.googleSignIn();
	}

	facebookSign() {
		this.authS.facebookSignIn();
	}
}
