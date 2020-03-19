import { Injectable } from '@angular/core';

interface Drop { type: number; value: number; name: string; }

@Injectable()
export class InventoryService {
  myInventory: Drop[] = [];

  constructor() {}

  addInventory(ingrList: Drop[]){
    for(const ingr of ingrList) {
      const result = this.myInventory.findIndex(({ name }) => name === ingr.name);
      if (result !== -1) {
        this.updateInventory(ingr);
      } else {
        this.myInventory.push(ingr);
      }
    }
    console.log(this.myInventory);
  }
  updateInventory(ingr: Drop){
    this.myInventory[this.myInventory.findIndex(({ name }) => name === ingr.name)].value += ingr.value;
  }
  removeInventory(){

  }
  ingrType(ingr: Drop) {

  }
}
