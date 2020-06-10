import { Component, OnInit } from '@angular/core';
import { faCarrot, faMortarPestle, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title = 'CookingDom';
  public ingrIcon = faCarrot;
  public rcpIcon = faMortarPestle;
  public invIcon = faBriefcase;
  public userIcon = faUser;
  public isMenuCollapsed = true;
  public isLoggedIn: Observable<boolean>;

  constructor(private authS: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authS.isLoggedIn;
  }

  signOut() {
    this.isMenuCollapsed = true;
    this.authS.signOut();
  }
}
