import { Component, OnInit } from '@angular/core';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons/faGithubAlt';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { slideInAnimation } from './animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
	public currentYear: number = new Date().getFullYear();
	public gitIcon = faGithubAlt;
	public isLoading: boolean;

	constructor(
		private activeRoute: ActivatedRoute,
		private authS: AuthService,
		private title: Title,
		private router: Router,
		private contexts: ChildrenOutletContexts
	) {}

	ngOnInit() {
		this.authS.isLoading.subscribe(loading => (this.isLoading = loading));
		// Setting the active route as page title
		const pageTitle = this.title.getTitle();
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => {
					const child = this.activeRoute.firstChild;
					if (child.snapshot.data.title) {
						return child.snapshot.data.title;
					}
					return pageTitle;
				})
			)
			.subscribe((title: string) => {
				this.title.setTitle(title);
			});
	}

	getRouteAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}
}
