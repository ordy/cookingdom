// type: 1=unit 2=mass 3=volume
export interface Ingredient {
	type: number;
	name: string;
	quantity: number;
}

export interface Recipe {
	rcpname: string;
	duration: number;
	difficulty: string;
	ingredients: Ingredient[];
	instructions: string[];
}

export interface DisplayIngr {
	type: string;
	name: string;
	quantity: string;
}
