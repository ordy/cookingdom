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
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [RouteGuard],
		data: { title: 'CooKingdom', animation: 'homePage' },
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginGuard],
		data: { title: 'Login', animation: 'loginPage' },
	},
	{
		path: 'ingredients',
		component: IngredientsComponent,
		canActivate: [RouteGuard],
		data: { title: 'Ingredients', animation: 'ingredientsPage' },
	},
	{
		path: 'inventory',
		component: InventoryComponent,
		canActivate: [RouteGuard],
		data: { title: 'Inventory', animation: 'inventoryPage' },
	},
	{
		path: 'recipes',
		component: RecipeListComponent,
		canActivate: [RouteGuard],
		data: { title: 'Recipes', animation: 'recipesPage' },
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [LoginGuard],
		data: { title: 'Register', animation: 'registerPage' },
	},
	{
		path: 'privacy',
		component: PrivacyComponent,
		data: { title: 'Privacy Policy', animation: 'privacyPage' },
	},
	{ path: '**', component: NotfoundComponent, data: { title: 'Not Found', animation: 'notFoundPage' } },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
