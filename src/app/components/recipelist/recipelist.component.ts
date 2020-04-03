import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipeListComponent implements OnInit {
  public offsetValue = 0;

  constructor(private invService: InventoryService) { };
  ngOnInit() {
  }
}
