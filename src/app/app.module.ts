import { BrowserModule, Title } from '@angular/platform-browser';
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
	],
	imports: [
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideDatabase(() => getDatabase()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
		BrowserModule,
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
