import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
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
