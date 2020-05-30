import { Component, OnInit } from '@angular/core';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public gitIcon = faGithubAlt;
  public isLoading: Observable<boolean>

  constructor(private activeRoute: ActivatedRoute, private authS: AuthService, private title: Title, private router: Router) { }

  ngOnInit() {
    this.isLoading = this.authS.isLoading;
    // Setting the active route as page title
    const appTitle = this.title.getTitle();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activeRoute.firstChild;
        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        return appTitle;
      })).subscribe((title: string) => {
        this.title.setTitle(title);
      });
  }


}
