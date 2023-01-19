import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat/app';

interface Ingredient {
	name: string;
	quantity: number;
	type: number;
}
interface Recipe {
	rcpname: string;
	duration: number;
	difficulty: string;
	ingredients: Ingredient[];
	instructions: string[];
}

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
	public rcplist: Recipe[]; // available recipes
	public recipeList: string[]; // search result names

	public page = 1;
	public pageSize = 15;

	constructor(private invService: InventoryService, private rdb: AngularFireDatabase) {}

	ngOnInit() {
		this.fetchDBVersion();
		const rcpJSON = localStorage.getItem('recipes');
		if (this.oldVersion() || rcpJSON === null) this.saveLocale();
		else this.rcplist = JSON.parse(rcpJSON);
	}

	searchRecipes() {
		this.recipeList = [];
		this.rcplist.forEach(recipe => {
			const avaibleRcp = recipe.ingredients.filter(ingr => this.ingrCheck(ingr.name, ingr.quantity));
			// make recipe avaible if enough ingredients
			if (avaibleRcp.length >= recipe.ingredients.length - this.offsetValue) this.recipeList.push(recipe.rcpname);
		});
		this.displayList = true;
		this.displayRec = false;
		this.showListToggle = false;
	}

	// TO-DO: work on the US-IS units conversion to check the quantity
	ingrCheck(name: string, quantity: number) {
		return this.invService.dropExists(name); // && this.invService.dropQuantity(name) >= quantity;
	}

	toggleList() {
		this.showListToggle = !this.showListToggle;
		this.displayRec = !this.displayRec;
	}

	showRecipe(listElem: string) {
		this.toggleList();
		this.recipeParent = this.rcplist.find(recipe => recipe.rcpname === listElem);
	}

	async saveLocale() {
		console.log('calling save locale');
		this.rcplist = [];
		await firebase
			.database()
			.ref('/recipeList')
			.once('value')
			.then(snapshot => {
				snapshot.forEach(el => {
					this.rcplist.push(el.val());
				});
			});
		localStorage.setItem('recipes', JSON.stringify(this.rcplist));
		localStorage.setItem('version', JSON.stringify(this.listVersion));
	}

	async fetchDBVersion() {
		await firebase
			.database()
			.ref('version')
			.once('value')
			.then(ver => {
				this.listVersion = ver.val();
			});
	}

	testfucntion() {
		console.log('length of rcpList:', this.rcplist.length);
	}

	// Checking if we cached the latest recipes from the db
	oldVersion(): boolean {
		const verJSON = localStorage.getItem('version');
		return verJSON || JSON.parse(verJSON) === this.listVersion ? false : true;
	}
}
