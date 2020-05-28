import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, take, mergeMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public googleIcon = faGoogle;
  public fbIcon = faFacebook;
  public mailIcon = faEnvelope;
  // regex: at least one lower, one upper, one special, 6 chars min-length
  private pwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*-_]{6,}$/;
  private usrPattern = /^[A-Za-z0-9]{3,20}$/;
  private lastUsername: string;
  private userExists: ValidationErrors;
  public providerUsername: string;

  public debouncer: any;

  public signupForm: FormGroup;
  public usernameForm: FormGroup;
  public username = new FormControl('', [Validators.required, Validators.pattern(this.usrPattern)], this.usernameCheck.bind(this));
  private email = new FormControl('', [Validators.required, Validators.email]);
  private password = new FormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);
  private pwConfirm = new FormControl('', [Validators.required, Validators.pattern(this.pwPattern)]);

  constructor(public authS: AuthService, private fb: FormBuilder) {
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

  usernameCheck(username: FormControl): Promise<any> | Observable<any> {
    // reseting debouce time on every validator call
    clearTimeout(this.debouncer);
    const promise = new Promise<any>((resolve, reject) => {
      this.debouncer = setTimeout(() => {
        if (username.value !== this.lastUsername) {
          this.lastUsername = username.value;
          const isTaken = this.authS.usernameTaken(username.value.toLowerCase());
          this.userExists = isTaken.then(res => {
            if (!res)
              return { userExists: true };
            else
              return null;
          });
        }
        resolve(this.userExists);
      }, 1700)
    });
    return promise;
  }

  displayTooltip(pattern: string) {
    let regX: RegExp;
    if (pattern === 'user') {
      regX = new RegExp(this.usrPattern);
      return regX.test(this.username.value) ? false : true;
    } else {
      regX = new RegExp(this.pwPattern);
      return regX.test(this.password.value) ? false : true;
    }
  }
}
