import { Component, OnInit } from '@angular/core';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InventoryService]
})
export class AppComponent implements OnInit {
  title = 'CooKingdom';
  currentYear: number = new Date().getFullYear();

  public isMenuCollapsed = true;

  constructor(private invService: InventoryService) {};
  ngOnInit() {
  }

}
