import { Injectable } from '@angular/core';
import {
	Firestore,
	doc,
	collection,
	CollectionReference,
	getDocs,
	updateDoc,
	deleteDoc,
	setDoc,
	where,
	orderBy,
	limit,
	query,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Ingredient } from '../model/ingredient';

@Injectable({
	providedIn: 'root',
})
export class InventoryService {
	public myInventory: Ingredient[] = [];
	public mySearch: Ingredient[] = [];
	public invRef: CollectionReference;
	public ingreRef: CollectionReference;

	constructor(private db: Firestore, private authS: AuthService) {
		const invJSON = localStorage.getItem('inventory');
		this.invRef = collection(this.db, 'users', this.authS.userUID, 'ingredients');
		this.ingreRef = collection(this.db, 'ingredients');

		if (invJSON !== null) {
			this.myInventory = JSON.parse(invJSON);
		} else {
			this.fetchIngredients();
		}
	}

	public async addInventory(ingreList: Ingredient[]) {
		for (const ingre of ingreList) {
			if (this.ingreExists(ingre.name)) {
				this.updateInventory(ingre);
			} else {
				this.myInventory.push(ingre);
				const ingreRef = doc(this.invRef, ingre.name.toLowerCase());
				await setDoc(ingreRef, {
					name: ingre.name,
					quantity: ingre.quantity,
					type: ingre.type,
				});
			}
		}
		this.localUpdate();
	}

	public async fetchIngredients(): Promise<void> {
		if (this.myInventory.length === 0) {
			const querySnapshot = await getDocs(this.invRef);
			querySnapshot.docs.map(el => {
				const ingre = el.data();
				const newIngre: Ingredient = { type: ingre.type, name: ingre.name, quantity: ingre.quantity };
				this.myInventory.push(newIngre);
			});
			this.localUpdate();
		}
	}

	private async updateInventory(ingre: Ingredient): Promise<void> {
		const index = this.ingreIndex(ingre.name);
		this.myInventory[index].quantity += ingre.quantity;
		const ingreRef = doc(this.invRef, ingre.name.toLowerCase());
		await updateDoc(ingreRef, {
			quantity: this.myInventory[index].quantity,
		});
	}

	public async editQuantity(ingre: string, quantity: number): Promise<void> {
		const index = this.ingreIndex(ingre);
		this.myInventory[index].quantity = quantity;
		const ingreRef = doc(this.invRef, ingre.toLowerCase());
		await updateDoc(ingreRef, {
			quantity: this.myInventory[index].quantity,
		});
		this.localUpdate();
	}

	public async removeIngre(ingre: string): Promise<void> {
		this.myInventory.splice(this.ingreIndex(ingre), 1);
		await deleteDoc(doc(this.invRef, ingre.toLowerCase()));
		this.localUpdate();
	}

	public async ingredientsQuery(searchInput: string) {
		if (searchInput.length > 1) {
			const ingreArray: Ingredient[] = [];
			searchInput = searchInput.toLowerCase();
			const offset = searchInput + '\uf8ff'; // High value UTF character
			const searchQuery = query(
				collection(this.db, 'ingredients'),
				orderBy('searchname'),
				where('searchname', '>=', searchInput),
				where('searchname', '<=', offset),
				limit(5)
			);
			await getDocs(searchQuery).then(async el => {
				el.forEach(x => ingreArray.push(x.data() as Ingredient));
			});
			return ingreArray;
		} else return [];
	}

	private ingreIndex(ingreName: string): number {
		return this.myInventory.findIndex(({ name }) => name === ingreName);
	}

	public ingreExists(ingreName: string): boolean {
		return this.myInventory.findIndex(({ name }) => name === ingreName) !== -1;
	}

	public ingreType(ingreName: string): number {
		return this.myInventory.find(({ name }) => name === ingreName).type;
	}

	public ingreQuantity(ingreName: string): number {
		return this.myInventory.find(({ name }) => name === ingreName).quantity;
	}

	private localUpdate(): void {
		localStorage.setItem('inventory', JSON.stringify(this.myInventory));
	}
}
