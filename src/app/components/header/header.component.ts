import { Component, OnInit } from '@angular/core';
import { faCarrot } from '@fortawesome/free-solid-svg-icons/faCarrot';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faMortarPestle } from '@fortawesome/free-solid-svg-icons/faMortarPestle';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	public title = 'CookingDom';
	public ingrIcon = faCarrot;
	public rcpIcon = faMortarPestle;
	public invIcon = faBriefcase;
	public userIcon = faUser;
	public isMenuCollapsed = true;
	public isLoggedIn: boolean;

	constructor(private authS: AuthService) {}

	ngOnInit() {
		this.authS.isLoggedIn.subscribe(el => {
			console.log('header el = ', el);
			if (el) this.isLoggedIn = el;
			else this.isLoggedIn = false;
		});
	}

	signOut() {
		this.isMenuCollapsed = true;
		this.authS.signOut();
	}
}
