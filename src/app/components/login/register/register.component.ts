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
  signupForm: FormGroup;
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  // pass: at least one lower, one upper, one special, min-lenght 6
  password = new FormControl('',
    [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*-_]{6,}')]);
  pwconfirmation = new FormControl('',
    [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*-_]{6,}')]);

  constructor(private authS: AuthService, public fb: FormBuilder) {
    this.signupForm = fb.group({
      username: this.username,
      email: this.email,
      password: this.password,
      passconfirm: this.pwconfirmation
    }, { validator: this.passcheck });
  }

  ngOnInit(): void {
  }
  googleRegister() {
    this.authS.googleSignUp();
  }
  facebookRegister() {
    this.authS.facebookSignUp();
  }
  signUp() {

  }

  passcheck(form: FormGroup) {
    const pass = form.get('password').value;
    const passconf = form.get('passconfirm').value;
    if (pass === passconf) {
      return null;
    } else {
      form.controls.passconfirm.setErrors({ incorrect: true });
      return { notSame: true };
    }
  }

}
