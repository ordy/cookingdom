import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

interface Ingredient {
	type: number;
	name: string;
	quantity: number;
}
interface Recipe {
	name: string;
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
	public recipeList: string[];
	public displayList: boolean;
	public displayRec: boolean;
	public showListToggle: boolean;
	public recipeParent: Recipe;
	private rcplist: Recipe[];
	private listVersion: number;

	public test: string;

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
			if (avaibleRcp.length >= recipe.ingredients.length - this.offsetValue) this.recipeList.push(recipe.name);
		});
		this.displayList = true;
		this.displayRec = false;
		this.showListToggle = false;
	}

	ingrCheck(name: string, quantity: number) {
		return this.invService.dropExists(name) && this.invService.dropQuantity(name) >= quantity;
	}

	toggleList() {
		this.showListToggle = !this.showListToggle;
		this.displayRec = !this.displayRec;
	}

	showRecipe(listElem: string) {
		this.toggleList();
		this.recipeParent = this.rcplist.find(recipe => recipe.name === listElem);
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
		this.test = 'OK';
	}

	oldVersion(): boolean {
		const verJSON = localStorage.getItem('version');
		return verJSON || JSON.parse(verJSON) === this.listVersion ? false : true;
	}
}
