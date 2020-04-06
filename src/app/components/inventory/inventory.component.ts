import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

interface Drop { type: number; name: string; quantity: number }

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public myvar: string;
  public myIngredients: Drop[] = [];

  constructor(private invService: InventoryService) {
    this.myIngredients = this.invService.myInventory;
  };

  ngOnInit() {
  }

}
