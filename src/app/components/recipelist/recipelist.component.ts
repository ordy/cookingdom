import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

interface Ingredient {type: number, name: string, quantity: number};
interface Recipe {name: string, duration: number, difficulty: string, ingredientsList: Ingredient[], instructions: string[]};

const recipesDB: Recipe[] = [
  {name: 'Chilli Con Carne', difficulty: 'A', duration: 10,
    ingredientsList: [
      { type: 2, name: 'Salt', quantity: 1},
      { type: 1, name: 'Tomato', quantity: 2},
      { type: 2, name: 'Chicken', quantity: 4},
      { type: 2, name: 'Spaghetti', quantity: 8},
      { type: 1, name: 'Apple', quantity: 16}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.',
      'Sed eget lacinia nunc. Curabitur ac semper justo, a sollicitudin turpis. Suspendisse semper.',
      'Aenean et scelerisque nisl, at placerat dolor. Curabitur sit amet molestie lectus, vitae hendrerit augue.'
    ]},
  {name: 'Chocolate Cookies', difficulty: 'B', duration: 15,
    ingredientsList: [
      { type: 2, name: 'Pork', quantity: 1},
      { type: 2, name: 'Pepper', quantity: 2},
      { type: 2, name: 'Potato', quantity: 3},
      { type: 2, name: 'Curry', quantity: 4}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.'
    ]},
  {name: 'Grilled Cheese', difficulty: 'C', duration: 20,
    ingredientsList: [
      { type: 2, name: 'Sardines', quantity: 10},
      { type: 2, name: 'Spaghetti', quantity: 20},
      { type: 1, name: 'Tomato', quantity: 30}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.',
      'Sed eget lacinia nunc. Curabitur ac semper justo, a sollicitudin turpis. Suspendisse semper.',
      'Aenean et scelerisque nisl, at placerat dolor. Curabitur sit amet molestie lectus, vitae hendrerit augue.'
    ]},
  {name: 'Macaroni and Cheese', difficulty: 'D', duration: 40,
    ingredientsList: [
      { type: 1, name: 'Banana', quantity: 11},
      { type: 1, name: 'Apple', quantity: 22},
      { type: 1, name: 'Orange', quantity: 33},
      { type: 3, name: 'Water', quantity: 44}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.'
    ]},
  {name: 'Paella', difficulty: 'S', duration: 120,
    ingredientsList: [
      { type: 1, name: 'Crab', quantity: 1},
      { type: 1, name: 'Tomato', quantity: 2},
      { type: 2, name: 'Sardines', quantity: 3}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.'
    ]},
  {name: 'Caesar Salad', difficulty: 'A', duration: 30,
    ingredientsList: [
      { type: 3, name: 'Olive oil', quantity: 1},
      { type: 1, name: 'Tomato', quantity: 3},
      { type: 2, name: 'Shrimps', quantity: 4},
      { type: 2, name: 'Pepper', quantity: 8}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.'
    ]},
  {name: 'Apple Pie', difficulty: 'B', duration: 10,
    ingredientsList: [
      { type: 2, name: 'Curry', quantity: 4},
      { type: 2, name: 'Macaroni', quantity: 23},
      { type: 2, name: 'Chicken', quantity: 3}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.',
      'Sed eget lacinia nunc. Curabitur ac semper justo, a sollicitudin turpis. Suspendisse semper.',
      'Aenean et scelerisque nisl, at placerat dolor. Curabitur sit amet molestie lectus, vitae hendrerit augue.'
    ]},
  {name: 'Scrambled Eggs', difficulty: 'C', duration: 5,
    ingredientsList: [
      { type: 1, name: 'Lobster', quantity: 1},
      { type: 2, name: 'Macaroni', quantity: 6},
      { type: 2, name: 'Potato', quantity: 7},
      { type: 2, name: 'Salt', quantity: 8}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.',
      'Sed eget lacinia nunc. Curabitur ac semper justo, a sollicitudin turpis. Suspendisse semper.'
    ]},
  {name: 'Lasagna', difficulty: 'D', duration: 15,
    ingredientsList: [
      { type: 2, name: 'Pork', quantity: 1},
      { type: 2, name: 'Lamb', quantity: 5},
      { type: 2, name: 'Pepper', quantity: 8},
      { type: 2, name: 'Chicken', quantity: 12}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.'
    ]},
  {name: 'Teriyaki Chicken', difficulty: 'S', duration: 180,
    ingredientsList: [
      { type: 2, name: 'Sardines', quantity: 0.4},
      { type: 1, name: 'Banana', quantity: 12},
      { type: 1, name: 'Crab', quantity: 5.75},
      { type: 2, name: 'Salt', quantity: 21},
      { type: 3, name: 'Pepper', quantity: 0.3}
    ],
    instructions: [
      'Nullam nec porta ligula, id pellentesque dui. Quisque semper eget arcu sit amet fermentum.',
      'Donec aliquet tortor a iaculis tempus. Vestibulum vel nunc urna. Sed ullamcorper lacus vitae bibendum porttitor.',
      'Duis erat arcu, sollicitudin in arcu et, euismod molestie est. Fusce auctor lorem id consectetur fermentum.',
      'Cras est enim, facilisis in ante in, ullamcorper sollicitudin est. Nulla fermentum, arcu ac lacinia scelerisque.'
    ]}
];

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipeListComponent implements OnInit {
  public offsetValue = 0;
  public recipeList: string[];
  public displayList: boolean;
  public displayRec: boolean;
  public showListToggle: boolean;
  public recipeParent = recipesDB[0];

  constructor(private invService: InventoryService) { };
  ngOnInit() {
  }

  searchRecipes(){
    this.recipeList = [];
    recipesDB.forEach( (recipe) => {
       const avaibleRcp = recipe.ingredientsList.filter(ingr => this.ingrCheck(ingr.name, ingr.quantity));
      // make recipe avaible if enough ingredients
      if (avaibleRcp.length >= (recipe.ingredientsList.length - this.offsetValue))
        this.recipeList.push(recipe.name);
    });
    this.displayList = true;
    this.displayRec = false;
    this.showListToggle = false;
  }

  ingrCheck(name: string, quantity: number){
    return this.invService.ingrExists(name) && this.invService.ingrQuantity(name) >= quantity;
  }

  toggleList(){
    this.showListToggle = !this.showListToggle;
    this.displayRec = !this.displayRec;
  }

  showRecipe(listElem: string){
    this.toggleList();
    this.recipeParent = recipesDB.find(recipe => recipe.name === listElem);
  }

}
