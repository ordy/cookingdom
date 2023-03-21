import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Recipe } from 'src/app/model/ingredient';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
	selector: 'app-recipelist',
	templateUrl: './recipelist.component.html',
	styleUrls: ['./recipelist.component.css'],
})
export class RecipeListComponent implements OnInit {
	public offsetValue = 0;
	public displayList: boolean;
	public displayRec: boolean;
	public showListToggle: boolean;
	public recipeParent: Recipe;
	public listVersion: number;
	public availableRecipes: Recipe[];
	public recipeNames: string[];

	public page = 1;
	public readonly pageSize = 15;

	public radioGroupForm: UntypedFormGroup;

	constructor(private formBuilder: UntypedFormBuilder, private invService: InventoryService) {}

	ngOnInit() {
		this.availableRecipes = this.invService.localRecipes;
		this.radioGroupForm = this.formBuilder.group({
			model: 0,
		});
	}

	searchRecipes() {
		this.recipeNames = [];
		this.availableRecipes.forEach(recipe => {
			const myIngredients = recipe.ingredients.filter(ingr => this.ingrCheck(ingr.name));
			// make recipe avaible if enough ingredients
			if (myIngredients.length >= recipe.ingredients.length - this.radioGroupForm.value.model)
				this.recipeNames.push(recipe.rcpname);
		});
		this.displayList = true;
		this.displayRec = false;
		this.showListToggle = false;
	}

	// TO-DO: work on the US-IS units conversion to check the quantity
	ingrCheck(name: string) {
		return this.invService.ingreExists(name);
	}

	toggleList() {
		this.showListToggle = !this.showListToggle;
		this.displayRec = !this.displayRec;
	}

	showRecipe(listElem: string) {
		this.toggleList();
		this.recipeParent = this.availableRecipes.find(recipe => recipe.rcpname === listElem);
	}
}
