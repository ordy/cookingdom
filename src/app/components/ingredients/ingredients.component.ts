import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { InventoryService } from '../../services/inventory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

// type: 1=unit 2=mass 3=volume
interface Ingredient {
	type: number;
	name: string;
}
interface Drop {
	type: number;
	name: string;
	quantity: number;
}

@Component({
	selector: 'app-ingredients',
	templateUrl: './ingredients.component.html',
	styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
	public selectedIngr: Ingredient;
	public selectedIngrValue = 1;
	public newIngredients: Drop[] = [];

	constructor(private invS: InventoryService, public db: AngularFirestore, private authS: AuthService) {}

	ngOnInit() {}

	listNotEmpty(): boolean {
		return this.newIngredients.length > 0;
	}

	ingredientType(): number {
		return this.selectedIngr?.type;
	}

	newIngr() {
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

	addIngredients() {
		this.invS.addInventory(this.newIngredients);
		this.newIngredients = [];
	}

	formatter = (ingredient: Ingredient) => ingredient.name;

	search = (text: Observable<string>) =>
		text.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			switchMap(search => {
				if (search.length > 1) {
					search = search.toLowerCase();
					const offset = search + '\uf8ff'; // High value UTF character
					return this.db
						.collection('ingredients', ref => ref.orderBy('searchname').startAt(search).endAt(offset).limit(5))
						.valueChanges();
				} else return [];
			})
		);
}
