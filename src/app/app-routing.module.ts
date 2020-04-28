import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'CooKingdom'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login - CD'}},
  {path: 'ingredients', component: IngredientsComponent, data: {title: 'Ingredients - CD'}},
  {path: 'inventory', component: InventoryComponent, data: {title: 'Inventory - CD'}},
  {path: 'recipes', component: RecipeListComponent, data: {title: 'Recipes - CD'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register - CD'}},
  {path: '**', component: NotfoundComponent, data: {title: 'Not-Found'}}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
