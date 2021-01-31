import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { FormsModule } from '@angular/forms';

describe('InventoryComponent', () => {
	let component: InventoryComponent;
	let fixture: ComponentFixture<InventoryComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [InventoryComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InventoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});
