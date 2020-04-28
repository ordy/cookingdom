import { Component } from '@angular/core';
import { faCarrot, faMortarPestle, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  public title = 'CooKingdom';
  public ingrIcon = faCarrot;
  public rcpIcon = faMortarPestle;
  public invIcon = faBriefcase;
  public userIcon = faUser;
  public isMenuCollapsed = true;
}
