import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { User } from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public saveLogin = false;

  constructor(private authS: AuthService) {
  }

  ngOnInit(): void {
    this.authS.signOut();
  }

  signIn(form: NgForm){
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authS.SignIn(email, password, this.saveLogin);
    this.authS.getValue();
    form.reset();
  }

  signOut(){
    this.authS.signOut();
  }
}
