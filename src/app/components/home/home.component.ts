import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public status = '';
  constructor(private authS: AuthService) {

  }

  ngOnInit(): void {
  }

  checkVerified(){
    if(this.authS.checkVerified())
      this.status = 'Acccount ' + this.authS.user.email + ' is VERIFIED!';
    else
      this.status = 'Acccount ' + this.authS.user.email + ' is NOT VERIFIED!';
  }
}
