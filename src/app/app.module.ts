import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { InventoryService } from './services/inventory.service';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipeComponent,
    IngredientsComponent
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
