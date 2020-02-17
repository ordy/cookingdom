import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const ingredients = [
  'Salt',
  'Papper',
  'Cinnamon',
  'Ginger',
  'Cumin',
  'Curry',
  'Tomato',
  'Cucumber',
  'Onion',
  'Cabbage',
  'Potato',
  'Bell Pepper',
  'Apple',
  'Orange',
  'Strawberry',
  'Cherry',
  'Pineapple',
  'Lemon',
  'Banana',
  'Chicken',
  'Lamb',
  'Beef',
  'Pork',
  'Duck',
  'Turkey',
  'Crab',
  'Lobster',
  'Mussels',
  'Clams',
  'Oysters',
  'Shrimps',
  'Salmon',
  'Tuna',
  'Cod',
  'Mackrel',
  'Herring',
  'Sardines',
  'Fettuccine',
  'Spaghetti',
  'Penne',
  'Fusilli',
  'Farfalle',
  'Macaroni'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CooKingdom';
  public selectedIngr: string;
  public isMenuCollapsed = true;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : ingredients.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) === 0).slice(0, 10))
    )

  constructor() {}
  ngOnInit() {
  }

}
