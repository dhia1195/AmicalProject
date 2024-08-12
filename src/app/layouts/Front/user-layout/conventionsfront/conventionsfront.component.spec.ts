import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsfrontComponent } from './conventionsfront.component';

describe('ConventionsfrontComponent', () => {
  let component: ConventionsfrontComponent;
  let fixture: ComponentFixture<ConventionsfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionsfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
