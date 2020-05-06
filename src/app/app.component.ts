import { Component, OnInit } from '@angular/core';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public gitIcon = faGithubAlt;

  constructor(private activeRoute: ActivatedRoute, private title: Title, private router: Router) { }

  ngOnInit() {
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
