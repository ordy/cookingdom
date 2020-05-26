import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { User } from 'firebase';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public saveLogin = false;
  public googleIcon = faGoogle;
  public fbIcon = faFacebook;
  public isLoading: Observable<boolean>

  constructor(private authS: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = this.authS.isLoading;
  }


  signIn(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authS.SignIn(email, password, this.saveLogin);
    form.reset();
  }

  providerSignIn(provider: string) {
    this.authS.providerSignIn(provider);
  }
}
