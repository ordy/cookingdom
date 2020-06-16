import { Component, Input } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Drop {
	type: number;
	name: string;
	quantity: number;
}

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
	@Input() dropInput: number;
	@Input() noConfirm: boolean;

	public dropName: string;
	public editMode = false;
	public myIngredients: Drop[] = [];

	constructor(private invService: InventoryService, private modalService: NgbModal) {
		this.myIngredients = this.invService.myInventory;
	}

	deleteDrop(content: any, ingr: string) {
		this.dropName = ingr;
		if (this.noConfirm) this.invService.removeDrop(ingr);
		else {
			this.modalService.open(content, { size: 'sm' }).result.then(
				res => {
					this.invService.removeDrop(ingr);
				},
				dismiss => {}
			);
		}
	}

	editDrop(content: any, ingr: string) {
		this.dropName = ingr;
		this.dropInput = this.invService.dropQuantity(ingr);
		this.modalService.open(content, { size: 'sm' }).result.then(
			res => {
				if (res > 9999) res = 9999;
				this.invService.editQuantity(ingr, res);
			},
			dismiss => {}
		);
	}
}
