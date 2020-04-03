import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

const routes: Routes = [
  {path: 'recipes', component: RecipeListComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'ingredients', component: IngredientsComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
