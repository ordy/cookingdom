import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Drop {
	type: number;
	name: string;
	quantity: number;
}

@Injectable({
	providedIn: 'root',
})
export class InventoryService {
	public unitSystem = 'INT';
	public unitName: string[] = ['', 'Kg', 'L'];
	public myInventory: Drop[] = [
		{ type: 1, name: 'Banana', quantity: 9999 },
		{ type: 2, name: 'Sardines', quantity: 9999 },
		{ type: 1, name: 'Crab', quantity: 9999 },
		{ type: 2, name: 'Salt', quantity: 9999 },
		{ type: 2, name: 'Pepper', quantity: 9999 },
		{ type: 2, name: 'Curry', quantity: 9999 },
		{ type: 2, name: 'Macaroni', quantity: 9999 },
		{ type: 2, name: 'Chicken', quantity: 9999 },
	];

	constructor(public db: AngularFirestore) {}

	addInventory(dropList: Drop[]) {
		for (const drop of dropList) {
			if (this.dropExists(drop.name)) {
				this.updateInventory(drop);
			} else {
				this.myInventory.push(drop);
			}
		}
	}

	addNewField() {
		this.db
			.collection('ingredients')
			.get()
			.forEach(el => {
				el.forEach(x => {
					let newname: string = x.get('name');
					newname = newname.toLowerCase();
					x.ref.update({ searchname: newname });
				});
			});
	}

	updateInventory(drop: Drop) {
		this.myInventory[this.myInventory.findIndex(({ name }) => name === drop.name)].quantity += drop.quantity;
	}

	editQuantity(dropName: string, quantity: number) {
		this.myInventory[this.myInventory.findIndex(({ name }) => name === dropName)].quantity = quantity;
	}

	removeDrop(dropName: string) {
		this.myInventory.splice(
			this.myInventory.findIndex(({ name }) => name === dropName),
			1
		);
	}

	dropExists(dropName: string) {
		return this.myInventory.findIndex(({ name }) => name === dropName) !== -1;
	}

	dropType(dropName: string) {
		return this.myInventory.find(({ name }) => name === dropName).type;
	}

	dropQuantity(dropName: string) {
		return this.myInventory.find(({ name }) => name === dropName).quantity;
	}
}
