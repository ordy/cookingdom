import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipelist/recipelist.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RouteGuard } from './guards/route.guard';
import { LoginGuard } from './guards/login.guard';
import { UsernameComponent } from './components/login/username/username.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RouteGuard], data: { title: 'CooKingdom' } },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard], data: { title: 'Login - CD' } },
  { path: 'ingredients', component: IngredientsComponent, canActivate: [RouteGuard], data: { title: 'Ingredients - CD' } },
  { path: 'inventory', component: InventoryComponent, canActivate: [RouteGuard], data: { title: 'Inventory - CD' } },
  { path: 'recipes', component: RecipeListComponent, canActivate: [RouteGuard], data: { title: 'Recipes - CD' } },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard], data: { title: 'Register - CD' } },
  { path: 'username', component: UsernameComponent, data: { title: 'Username - CD' } },
  { path: '**', component: NotfoundComponent, data: { title: 'Not-Found' } }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
