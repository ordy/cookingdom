import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { AppRoutingModule } from './app-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { InventoryService } from './services/inventory.service';
import { RecipeComponent } from './components/recipelist/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { UsernameComponent } from './components/login/username/username.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipeListComponent,
    IngredientsComponent,
    RecipeComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    NotfoundComponent,
    LoadingComponent,
    UsernameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [InventoryService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
