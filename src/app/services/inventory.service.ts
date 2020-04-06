import { Injectable } from '@angular/core';

interface Drop { type: number; name: string; quantity: number }

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  myInventory: Drop[] = [
    { type: 1, name: 'Banana', quantity: 2000},
    { type: 2, name: 'Sardines', quantity: 10002},
    { type: 1, name: 'Crab', quantity: 12221},
    { type: 2, name: 'Salt', quantity: 22221},
    { type: 2, name: 'Pepper', quantity: 999992},
    { type: 2, name: 'Curry', quantity: 42222},
    { type: 2, name: 'Macaroni', quantity: 222223},
    { type: 2, name: 'Chicken', quantity: 32222}];

  constructor() {}

  addInventory(ingrList: Drop[]){
    for(const ingr of ingrList) {
      if (this.ingrExists(ingr.name)) {
        this.updateInventory(ingr);
      } else {
        this.myInventory.push(ingr);
      }
    }
    console.log(this.myInventory);
  }

  updateInventory(ingr: Drop){
    this.myInventory[this.myInventory.findIndex(({ name }) => name === ingr.name)].quantity += ingr.quantity;
  }

  removeInventory(ingrName: string){
    this.myInventory.splice(this.myInventory.findIndex(({ name }) => name === ingrName), 1);
  }

  ingrExists(ingrName: string){
    return (this.myInventory.findIndex(({ name }) => name === ingrName) !== -1);
  }

  ingrType(ingrName: string) {
    return this.myInventory.find(({ name }) => name === ingrName).type;
  }

  ingrQuantity(ingrName: string){
    return this.myInventory.find(({ name }) => name === ingrName).quantity;
  }
}
