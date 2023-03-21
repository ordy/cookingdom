import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	public saveLogin = false;
	public isLoading: boolean;
	public demouser = 'DemoUser';
	public demopass = 'D3MOPA$$WORD';

	constructor(private authS: AuthService) {}

	ngOnInit(): void {
		this.authS.isLoading.subscribe(loading => (this.isLoading = loading));
	}

	public signIn(form: NgForm): void {
		this.authS.SignIn();
		form.reset();
	}
}
