import { Injectable } from '@angular/core';

interface Drop { type: number; name: string; quantity: number }

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  public unitSystem = 'INT';
  public unitName: string[] = ['','Kg','L'];
  public myInventory: Drop[] = [
    { type: 1, name: 'Banana', quantity: 2000},
    { type: 2, name: 'Sardines', quantity: 10002},
    { type: 1, name: 'Crab', quantity: 12221},
    { type: 2, name: 'Salt', quantity: 22221},
    { type: 2, name: 'Pepper', quantity: 999992},
    { type: 2, name: 'Curry', quantity: 42222},
    { type: 2, name: 'Macaroni', quantity: 222223},
    { type: 2, name: 'Chicken', quantity: 32222}
  ];

  constructor() {}

  addInventory(dropList: Drop[]){
    for(const drop of dropList) {
      if (this.dropExists(drop.name)) {
        this.updateInventory(drop);
      } else {
        this.myInventory.push(drop);
      }
    }
    console.log(this.myInventory);
  }

  updateInventory(drop: Drop){
    this.myInventory[this.myInventory.findIndex(({ name }) => name === drop.name)].quantity += drop.quantity;
  }

  editQuantity(dropName: string, quantity: number){
    this.myInventory[this.myInventory.findIndex(({ name }) => name === dropName)].quantity = quantity;
  }

  removeDrop(dropName: string){
    this.myInventory.splice(this.myInventory.findIndex(({ name }) => name === dropName), 1);
  }

  dropExists(dropName: string){
    return (this.myInventory.findIndex(({ name }) => name === dropName) !== -1);
  }

  dropType(dropName: string){
    return this.myInventory.find(({ name }) => name === dropName).type;
  }

  dropQuantity(dropName: string){
    return this.myInventory.find(({ name }) => name === dropName).quantity;
  }
}
