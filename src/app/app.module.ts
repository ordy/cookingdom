import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { AppRoutingModule } from './app-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { InventoryService } from './services/inventory.service';
import { RecipeComponent } from './components/recipelist/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipeListComponent,
    IngredientsComponent,
    RecipeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [ InventoryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
