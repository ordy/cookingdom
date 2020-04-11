import { Component, Input } from '@angular/core';

interface Ingredient {type: number, name: string, quantity: number};
interface Recipe {name: string, duration: number, difficulty: string, ingredientsList: Ingredient[], instructions: string[]};

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  @Input() rcpName: Recipe;

  getImagePath(){
    return '/assets/recipes/' + encodeURI(this.rcpName.name.replace(/\s+/g, '-').toLowerCase()).replace(/\'/g, '') + '.jpg';
  }
}
