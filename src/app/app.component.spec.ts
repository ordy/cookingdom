import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FontAwesomeModule],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();
  }));
});
