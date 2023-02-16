import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbCollapseModule, NgbModule, NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipeComponent } from './components/recipelist/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { UsernameComponent } from './components/login/username/username.component';
import { InventoryService } from './services/inventory.service';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

const cookieConfig: NgcCookieConsentConfig = {
	cookie: {
		domain: window.location.hostname,
	},
	position: 'bottom',
	theme: 'edgeless',
	palette: {
		popup: {
			background: '#131519',
			text: '#ffffff',
			link: '#ffffff',
		},
		button: {
			background: '#0d6efd',
			text: '#fafafa',
			border: 'transparent',
		},
	},
	type: 'info',
	content: {
		message: 'By using this website, you agree with the storage and handling of your data.',
		dismiss: 'Got it!',
		deny: 'Refuse',
		link: 'Learn more',
		href: 'https://cookingdom.vercel.app/privacy',
		policy: 'Cookie Policy',
	},
};

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		InventoryComponent,
		RecipeListComponent,
		IngredientsComponent,
		RecipeComponent,
		LoginComponent,
		HomeComponent,
		RegisterComponent,
		NotfoundComponent,
		LoadingComponent,
		UsernameComponent,
		PrivacyComponent,
	],
	imports: [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideDatabase(() => getDatabase()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		NgbCarouselModule,
		NgbCollapseModule,
		NgbPaginationModule,
		ReactiveFormsModule,
		NgbModule,
		AppRoutingModule,
		FontAwesomeModule,
		RecaptchaV3Module,
		NgcCookieConsentModule.forRoot(cookieConfig),
	],
	providers: [
		{
			provide: RECAPTCHA_V3_SITE_KEY,
			useValue: environment.recaptcha.siteKey,
		},
		InventoryService,
		Title,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
