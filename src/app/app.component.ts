import { Component, OnInit } from '@angular/core';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public gitIcon = faGithubAlt;

  constructor(private authS: AuthService) {}

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    // console.log(this.authS.user);
    return true;
    // return this.authS.user !== null ? true : false;
  }

}
