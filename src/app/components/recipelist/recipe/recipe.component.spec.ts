import { TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';

describe('RecipeComponent', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RecipeComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		const fixture = TestBed.createComponent(RecipeComponent);
		fixture.detectChanges();
	});
});
