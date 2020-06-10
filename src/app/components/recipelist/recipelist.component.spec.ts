import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipelist.component';
import { NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('RecipeComponent', () => {
	let component: RecipeListComponent;
	let fixture: ComponentFixture<RecipeListComponent>;

	beforeEach(async(() => {
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
