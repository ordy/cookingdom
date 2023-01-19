import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
				// WIP - write on serverside collection
				this.invRef.doc(drop.name.toLowerCase()).set({
					name: drop.name,
					quantity: drop.quantity,
					type: drop.type,
				});
			}
		}
		this.localUpdate();
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
		this.invRef.doc(drop.name.toLowerCase()).update({
			quantity: this.myInventory[this.myInventory.findIndex(({ name }) => name === drop.name)].quantity,
		});
	}

	editQuantity(dropName: string, quantity: number) {
		this.myInventory[this.myInventory.findIndex(({ name }) => name === dropName)].quantity = quantity;
		this.invRef.doc(dropName.toLowerCase()).update({
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
		return this.myInventory.findIndex(({ name }) => name.toLowerCase() === dropName) !== -1;
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
