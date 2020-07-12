import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

interface Drop {
	type: number;
	name: string;
	quantity: number;
}

@Injectable({
	providedIn: 'root',
})
export class InventoryService {
	/* public myInventory: Drop[] = [
		{ type: 1, name: 'Banana', quantity: 9999 },
		{ type: 2, name: 'Sardines', quantity: 9999 },
		{ type: 1, name: 'Crab', quantity: 9999 },
		{ type: 2, name: 'Salt', quantity: 9999 },
		{ type: 2, name: 'Pepper', quantity: 9999 },
		{ type: 2, name: 'Curry', quantity: 9999 },
		{ type: 2, name: 'Macaroni', quantity: 9999 },
		{ type: 2, name: 'Chicken', quantity: 9999 },
	]; */
	public myInventory: Drop[] = [];
	public invRef: AngularFirestoreCollection;

	constructor(public db: AngularFirestore, public authS: AuthService) {
		const invJSON = localStorage.getItem('inventory');
		this.invRef = this.db.collection('users').doc(this.authS.currentUID).collection('ingredients');
		if (invJSON !== null) {
			this.myInventory = JSON.parse(invJSON);
		} else {
			this.fetchIngredients();
		}
	}

	addInventory(dropList: Drop[]) {
		for (const drop of dropList) {
			if (this.dropExists(drop.name)) {
				this.updateInventory(drop);
			} else {
				this.myInventory.push(drop);
			}
		}
	}

	async fetchIngredients() {
		if (this.myInventory.length === 0) {
			await this.invRef.get().forEach(el => {
				el.forEach(x => {
					const newIngr: Drop = { type: x.get('type'), name: x.get('name'), quantity: x.get('quantity') };
					this.myInventory.push(newIngr);
				});
			});
			this.localUpdate();
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
		this.invRef.doc(drop.name).update({
			quantity: this.myInventory[this.myInventory.findIndex(({ name }) => name === drop.name)].quantity,
		});
		this.localUpdate();
	}

	editQuantity(dropName: string, quantity: number) {
		this.myInventory[this.myInventory.findIndex(({ name }) => name === dropName)].quantity = quantity;
		this.invRef.doc(dropName).update({
			quantity: this.myInventory[this.myInventory.findIndex(({ name }) => name === dropName)].quantity,
		});
		this.localUpdate();
	}

	removeDrop(dropName: string) {
		this.myInventory.splice(
			this.myInventory.findIndex(({ name }) => name === dropName),
			1
		);
		this.localUpdate();
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

	localUpdate() {
		localStorage.setItem('inventory', JSON.stringify(this.myInventory));
	}
}
