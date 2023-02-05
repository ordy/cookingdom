import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { getDatabase, ref, child, get } from '@angular/fire/database';
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
		this.fetchDBVersion();
		const rcpJSON = localStorage.getItem('recipes');
		if (this.oldVersion() || rcpJSON === null) this.saveLocale();
		else this.availableRecipes = JSON.parse(rcpJSON);
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

	saveLocale() {
		this.availableRecipes = [];

		const dbRef = ref(getDatabase());
		get(child(dbRef, `recipeList/`))
			.then(snapshot => {
				if (snapshot.exists()) {
					snapshot.forEach(el => {
						this.availableRecipes.push(el.val());
					});
					localStorage.setItem('recipes', JSON.stringify(this.availableRecipes));
					localStorage.setItem('version', JSON.stringify(this.listVersion));
				} else {
					console.log('Cannot fetch recipe db.');
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	fetchDBVersion() {
		const dbRef = ref(getDatabase());
		get(child(dbRef, `version`))
			.then(snapshot => {
				if (snapshot.exists()) {
					this.listVersion = snapshot.val();
				} else {
					console.log('Cannot fetch db version.');
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	// Checking if we cached the latest recipes from the db
	oldVersion(): boolean {
		const verJSON = localStorage.getItem('version');
		return verJSON || JSON.parse(verJSON) === this.listVersion ? false : true;
	}
}
