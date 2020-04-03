import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { AppRoutingModule } from './app-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { InventoryService } from './services/inventory.service';
import { RecipeComponent } from './components/recipelist/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipeListComponent,
    IngredientsComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [ InventoryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
