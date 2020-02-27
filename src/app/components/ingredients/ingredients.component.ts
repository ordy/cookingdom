import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

// type: 1=unit 2=mass 3=volume
interface Ingredient { id: number; type: number; name: string; }

// type: 1=unit 2=mass 3=volume
const ingredients: Ingredient[] = [
  { id: 0, type: 2, name: 'Salt'},
  { id: 1, type: 2, name: 'Pepper' },
  { id: 2, type: 1, name: 'Tomato' },
  { id: 3, type: 1, name: 'Cucumber' },
  { id: 4, type: 1, name: 'Apple' },
  { id: 5, type: 1, name: 'Orange' },
  { id: 6, type: 1, name: 'Banana' },
  { id: 7, type: 2, name: 'Chicken' },
  { id: 8, type: 2, name: 'Lamb' },
  { id: 9, type: 2, name: 'Pork' },
  { id: 10, type: 1, name: 'Lobster' },
  { id: 11, type: 1, name: 'Crab' },
  { id: 12, type: 2, name: 'Shrimps' },
  { id: 13, type: 1, name: 'Salmon' },
  { id: 14, type: 2, name: 'Spaghetti' },
  { id: 15, type: 2, name: 'Fusilli' },
  { id: 16, type: 2, name: 'Sardines' },
  { id: 17, type: 2, name: 'Macaroni' },
  { id: 18, type: 2, name: 'Potato' },
  { id: 19, type: 2, name: 'Curry' },
  { id: 20, type: 3, name: 'Water' },
  { id: 21, type: 3, name: 'Olive oil' }
];

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  public selectedIngr: Ingredient;
  public selectedIngrValue = 1;
  public newIngredients = [];

  formatter = (ingredient: Ingredient) => ingredient.name;

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? [] : ingredients.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) === 0).slice(0, 10))
  )
  constructor() {
  }
  ngOnInit(): void {
  }
  newIngr() {
    const food = { id : this.selectedIngr.id,
                   name : this.selectedIngr.name,
                   value : Math.abs(this.selectedIngrValue) };
    const result = this.newIngredients.findIndex(({ name }) => name === food.name);
    if ((this.newIngredients.length !== 0) && result !== -1) {
      this.newIngredients[result].value += food.value;
    } else {
      this.newIngredients.push(food);
    }
  }
}
