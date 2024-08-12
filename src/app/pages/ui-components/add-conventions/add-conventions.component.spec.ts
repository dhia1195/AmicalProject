import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConventionsComponent } from './add-conventions.component';

describe('AddConventionsComponent', () => {
  let component: AddConventionsComponent;
  let fixture: ComponentFixture<AddConventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
