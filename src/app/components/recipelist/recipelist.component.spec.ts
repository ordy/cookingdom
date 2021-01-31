import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecipeListComponent } from './recipelist.component';
import { NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('RecipeComponent', () => {
	let component: RecipeListComponent;
	let fixture: ComponentFixture<RecipeListComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [RecipeListComponent, NgbRadioGroup],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RecipeListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});
