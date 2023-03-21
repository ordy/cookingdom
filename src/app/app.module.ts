import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbCollapseModule, NgbModule, NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
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
import { InventoryService } from './services/inventory.service';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { getAuth, provideAuth } from '@angular/fire/auth';

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
		PrivacyComponent,
	],
	imports: [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
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
	],
	providers: [InventoryService, Title],
	bootstrap: [AppComponent],
})
export class AppModule {}
