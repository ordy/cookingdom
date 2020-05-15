import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public displayForm = false;
  public googleIcon = faGoogle;
  public fbIcon = faFacebook;
  public mailIcon = faEnvelope;
  private pwPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*-_]{6,}';
  private usrPattern = '[A-Za-z0-9]{3,15}';
  public providerUsername: string;
  public signupForm: FormGroup;
  public usernameForm: FormGroup;
  public username = new FormControl('',
    [Validators.required,
    Validators.pattern(this.usrPattern)]);
  private email = new FormControl('', [Validators.required, Validators.email]);
  // pass: at least one lower, one upper, one special, min-lenght 6
  private password = new FormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);
  private pwConfirm = new FormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);

  constructor(private authS: AuthService, private fb: FormBuilder) {
    this.signupForm = fb.group({
      username: this.username,
      email: this.email,
      password: this.password,
      pwConfirm: this.pwConfirm
    }, { validator: this.pwCheck });
  }

  ngOnInit(): void {
  }

  signUp() {
    const user = this.signupForm.value.username;
    const mail = this.signupForm.value.email;
    const pass = this.signupForm.value.password;
    this.authS.signUp(user, mail, pass);
  }

  pwCheck(form: FormGroup) {
    const pass = form.value.password;
    const confirmation = form.value.pwConfirm;
    if (pass === confirmation) {
      return null;
    } else {
      form.controls.pwConfirm.setErrors({ incorrect: true });
      return { notSame: true };
    }
  }

  saveUsername() {
    // to-do
  }

  test() {
    this.authS.testAddUser();
  }

  test2() {
    this.authS.testStatus();
  }
}
