import { Component, Input } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/model/ingredient';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
	@Input() IngreInput: number;
	@Input() noConfirm: boolean;

	public page = 1;
	public readonly pageSize = 15;

	public IngreName: string;
	public editMode = false;
	public myIngredients: Ingredient[] = [];

	constructor(private invService: InventoryService, private modalService: NgbModal) {
		this.myIngredients = this.invService.myInventory;
	}

	deleteIngre(content: any, ingr: string) {
		this.IngreName = ingr;
		if (this.noConfirm) {
			this.invService.removeIngre(ingr.toLowerCase());
		} else {
			this.modalService.open(content, { size: 'sm' }).result.then(
				() => {
					this.invService.removeIngre(ingr.toLowerCase());
				},
				dismiss => {}
			);
		}
	}

	editIngre(content: any, ingr: string) {
		this.IngreName = ingr;
		this.IngreInput = this.invService.ingreQuantity(ingr);
		this.modalService.open(content, { size: 'sm' }).result.then(
			res => {
				if (res > 9999) res = 9999;
				this.invService.editQuantity(ingr, res);
			},
			dismiss => {}
		);
	}
}
