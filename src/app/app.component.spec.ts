import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
