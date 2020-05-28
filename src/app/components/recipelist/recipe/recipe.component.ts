import { Component, Input, OnChanges } from '@angular/core';

interface Ingredient { type: number, name: string, quantity: number };
interface DisplayIngr { type: string, name: string, quantity: string };
interface Recipe { name: string, duration: number, difficulty: string, ingredientsList: Ingredient[], instructions: string[] };

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnChanges {
  public displayRecipe: DisplayIngr[] = [];
  public fractionsTable: string[] = ['1/4', '1/2', '3/4'];

  @Input() rcpName: Recipe;

  ngOnChanges() {
    let formatedIngr: DisplayIngr;
    this.rcpName.ingredientsList.forEach(ingr => {
      formatedIngr = { type: '', name: '', quantity: '' };
      switch (ingr.type) {
        case 1: {
          formatedIngr.type = '';
          const fraction = ingr.quantity % 1;
          if (fraction !== 0) { // check if we have fraction of ingredient
            formatedIngr.quantity = this.fractionsTable[fraction / 0.25 - 1];
            if (Math.trunc(ingr.quantity) > 0)
              formatedIngr.quantity = Math.trunc(ingr.quantity).toString() + '+' + formatedIngr.quantity;
          }
          else
            formatedIngr.quantity = ingr.quantity.toString();
          break;
        }
        case 2: {
          if (Math.trunc(ingr.quantity) === 0) {
            formatedIngr.type = 'g';
            formatedIngr.quantity = (ingr.quantity % 1 * 1000).toString();
          } else {
            formatedIngr.type = 'kg';
            formatedIngr.quantity = ingr.quantity.toString();
          }
          break;
        }
        case 3: {
          if (Math.trunc(ingr.quantity) === 0) {
            formatedIngr.type = 'ml';
            formatedIngr.quantity = (ingr.quantity % 1 * 1000).toString();
          } else {
            formatedIngr.type = 'L';
            formatedIngr.quantity = ingr.quantity.toString();
          }
          break;
        }
      }
      formatedIngr.name = ingr.name;
      this.displayRecipe.push(formatedIngr);
    });
  }

  getImagePath() {
    return '/assets/recipes/' + encodeURI(this.rcpName?.name.replace(/\s+/g, '-').toLowerCase()).replace(/\'/g, '') + '.jpg';
  }
}