import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IngreDemo, Ingredient } from '../model/ingredient';
import { Recipe } from '../model/ingredient';
import ingredb from '../../assets/data/ingredients.mini.json';
import rcpdb from '../../assets/data/recipes.mini.json';
import inventorydb from '../../assets/data/inventory.json';

@Injectable({
	providedIn: 'root',
})
export class InventoryService {
	public myInventory: Ingredient[] = [];
	public mySearch: Ingredient[] = [];
	public myRecipes: Recipe[] = [];

	public localIngredients: IngreDemo[] = [];
	public localRecipes: Recipe[] = [];

	constructor(private authS: AuthService) {
		this.fetchIngredients();
	}

	public async addInventory(ingreList: Ingredient[]) {
		for (const ingre of ingreList) {
			if (this.ingreExists(ingre.name)) {
				this.updateInventory(ingre);
			} else {
				this.myInventory.push(ingre);
			}
		}
	}

	public async fetchIngredients(): Promise<void> {
		ingredb.ingredients.forEach(x => this.localIngredients.push(x as IngreDemo));
		Object.keys(rcpdb.recipeList).forEach(key => this.localRecipes.push(rcpdb.recipeList[key]));
		this.myInventory = [...inventorydb.inventoryData];
	}

	private async updateInventory(ingre: Ingredient): Promise<void> {
		const index = this.ingreIndex(ingre.name);
		this.myInventory[index].quantity += ingre.quantity;
	}

	public async editQuantity(ingre: string, quantity: number): Promise<void> {
		const index = this.ingreIndex(ingre);
		this.myInventory[index].quantity = quantity;
	}

	public async removeIngre(ingre: string): Promise<void> {
		this.myInventory.splice(this.ingreIndex(ingre), 1);
	}

	public async ingredientsQuery(searchInput: string) {
		if (searchInput.length > 1) {
			searchInput = searchInput.toLowerCase();
			//const offset = searchInput + '\uf8ff'; // High value UTF character
			// el.forEach(x => ingreArray.push(x.data() as Ingredient));
			const ingreArray = this.localIngredients
				.filter(ingre => ingre.sname.indexOf(searchInput.toLowerCase()) > -1)
				.slice(0, 8);
			return ingreArray;
		} else return [];
	}

	private ingreIndex(ingreName: string): number {
		return this.myInventory.findIndex(({ name }) => name === ingreName);
	}

	public ingreExists(ingreName: string): boolean {
		return this.myInventory.findIndex(({ name }) => name === ingreName) !== -1;
	}

	public ingreType(ingreName: string): number {
		return this.myInventory.find(({ name }) => name === ingreName).type;
	}

	public ingreQuantity(ingreName: string): number {
		return this.myInventory.find(({ name }) => name === ingreName).quantity;
	}
}
