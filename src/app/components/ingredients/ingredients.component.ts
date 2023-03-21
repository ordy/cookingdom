import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { InventoryService } from '../../services/inventory.service';
import { IngreDemo, Ingredient } from 'src/app/model/ingredient';

@Component({
	selector: 'app-ingredients',
	templateUrl: './ingredients.component.html',
	styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
	public selectedIngr: Ingredient;
	public selectedIngrValue = 1;
	public newIngredients: Ingredient[] = [];
	public searching = false;

	constructor(public invS: InventoryService) {}

	listNotEmpty(): boolean {
		return this.newIngredients.length > 0;
	}

	ingredientType(): number {
		return this.selectedIngr?.type;
	}

	addIngredient() {
		const food = {
			type: this.selectedIngr.type,
			name: this.selectedIngr.name,
			quantity: Math.abs(this.selectedIngrValue),
		};
		const result = this.newIngredients.findIndex(({ name }) => name === food.name);
		if (this.newIngredients.length !== 0 && result !== -1) {
			this.newIngredients[result].quantity += food.quantity;
		} else {
			this.newIngredients.push(food);
		}
	}

	saveIngredients() {
		this.invS.addInventory(this.newIngredients);
		this.newIngredients = [];
	}

	formatter = (ingredient: Ingredient) => ingredient.name;

	search = (input$: Observable<string>): Observable<IngreDemo[]> =>
		input$.pipe(
			tap(() => (this.searching = true)),
			debounceTime(250),
			distinctUntilChanged(),
			switchMap((input: string) => this.invS.ingredientsQuery(input)),
			tap(() => (this.searching = false))
		);
}
