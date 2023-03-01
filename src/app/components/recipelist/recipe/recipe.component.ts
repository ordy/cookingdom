import { Component, Input, OnChanges } from '@angular/core';
import { DisplayIngr, Recipe } from 'src/app/model/ingredient';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnChanges {
	public displayRecipe: DisplayIngr[] = [];
	public fractionsTable: string[] = ['1/4', '1/2', '3/4'];
	private readonly storage = getStorage();

	@Input() rcpName: Recipe;

	ngOnChanges() {
		let formatedIngr: DisplayIngr;
		this.rcpName.ingredients.forEach(ingr => {
			formatedIngr = { type: '', name: '', quantity: '' };
			switch (ingr.type) {
				case 1: {
					formatedIngr.type = '';
					const fraction = ingr.quantity % 1;
					if (fraction !== 0) {
						// check if we have fraction of ingredient
						formatedIngr.quantity = this.fractionsTable[fraction / 0.25 - 1];
						if (Math.trunc(ingr.quantity) > 0)
							formatedIngr.quantity = Math.trunc(ingr.quantity).toString() + '+' + formatedIngr.quantity;
					} else formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 2: {
					if (Math.trunc(ingr.quantity) === 0) {
						formatedIngr.type = 'g';
						formatedIngr.quantity = ((ingr.quantity % 1) * 1000).toString();
					} else {
						formatedIngr.type = 'kg';
						formatedIngr.quantity = ingr.quantity.toString();
					}
					break;
				}
				case 3: {
					if (Math.trunc(ingr.quantity) === 0) {
						formatedIngr.type = 'ml';
						formatedIngr.quantity = ((ingr.quantity % 1) * 1000).toString();
					} else {
						formatedIngr.type = 'L';
						formatedIngr.quantity = ingr.quantity.toString();
					}
					break;
				}
				case 4: {
					// Tablespoon
					formatedIngr.type = 'tbps';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 5: {
					// Teaspoon
					formatedIngr.type = 'tsp';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 6: {
					// Cups
					formatedIngr.type = 'cup';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 7: {
					// Pack
					formatedIngr.type = 'pack';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 8: {
					// Ounce
					formatedIngr.type = 'oz';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 9: {
					// Pound
					formatedIngr.type = 'lb';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 10: {
					// Gallon
					formatedIngr.type = 'gal';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 11: {
					// Pinch
					formatedIngr.type = 'pn';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 12: {
					// Drop
					formatedIngr.type = 'dr';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
				case 13: {
					// Square
					formatedIngr.type = 'sqr';
					formatedIngr.quantity = ingr.quantity.toString();
					break;
				}
			}
			formatedIngr.name = ingr.name;
			this.displayRecipe.push(formatedIngr);
		});
		this.getImagePath();
	}

	getImagePath() {
		const recipeImg = 'recipes/' + this.rcpName.rcpname.replace(/\s/g, '').toLocaleLowerCase() + '.jpg';
		getDownloadURL(ref(this.storage, recipeImg))
			.then(url => {
				const img = document.getElementById('rcp-image');
				img.setAttribute('src', url);
			})
			.catch(error => {
				console.log(error);
			});
	}
}
