import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { InventoryService } from '../../services/inventory.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// type: 1=unit 2=mass 3=volume
interface Ingredient { type: number; name: string }
interface Drop { type: number; name: string; quantity: number }
interface Ingre {name: string, quantity: number, type: number }

// type: 1=unit 2=mass 3=volume
const ingredients: Ingredient[] = [
  { type: 2, name: 'Salt' },
  { type: 2, name: 'Pepper' },
  { type: 1, name: 'Tomato' },
  { type: 1, name: 'Cucumber' },
  { type: 1, name: 'Apple' },
  { type: 1, name: 'Orange' },
  { type: 1, name: 'Banana' },
  { type: 2, name: 'Chicken' },
  { type: 2, name: 'Lamb' },
  { type: 2, name: 'Pork' },
  { type: 1, name: 'Lobster' },
  { type: 1, name: 'Crab' },
  { type: 2, name: 'Shrimps' },
  { type: 1, name: 'Salmon' },
  { type: 2, name: 'Spaghetti' },
  { type: 2, name: 'Fusilli' },
  { type: 2, name: 'Sardines' },
  { type: 2, name: 'Macaroni' },
  { type: 2, name: 'Potato' },
  { type: 2, name: 'Curry' },
  { type: 3, name: 'Water' },
  { type: 3, name: 'Olive Oil' }
];

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  public selectedIngr: Ingredient;
  public selectedIngrValue = 1;
  public newIngredients: Drop[] = [];

  //  ingreCol: AngularFirestoreCollection<Ingre>;
  // ingres: Observable<Ingre[]>;

  formatter = (ingredient: Ingredient) => ingredient.name;

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? [] : ingredients.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) === 0).slice(0, 10))
  )

  constructor(private invService: InventoryService, public db: AngularFirestore) {};

  ngOnInit() {
  //  console.log('in ngOnInit before the db call ... ');
   // this.ingreCol = this.db.collection('ingredients');
   // this.ingres = this.ingreCol.valueChanges();
  //  console.log(this.ingres);
  }

  listNotEmpty() : boolean {
    return this.newIngredients.length > 0;
  }

  ingredientType() : number {
    return this.selectedIngr?.type;
  }

  newIngr() {
    const food = { type : this.selectedIngr.type,
                   name : this.selectedIngr.name,
                   quantity : Math.abs(this.selectedIngrValue) };
    const result = this.newIngredients.findIndex(({ name }) => name === food.name);
    if ((this.newIngredients.length !== 0) && result !== -1) {
      this.newIngredients[result].quantity += food.quantity;
    } else {
      this.newIngredients.push(food);
    }
  }

  addIngredients() {
    this.invService.addInventory(this.newIngredients);
    this.newIngredients = [];
  }

  getUsers(){
   // console.log(this.db.collection('ingredients').snapshotChanges());
  }
}
