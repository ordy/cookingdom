import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

const routes: Routes = [
  {path: 'recipes', component: RecipeComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'ingredients', component: IngredientsComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
