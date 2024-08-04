import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlidesComponent } from './add-slides.component';

describe('AddSlidesComponent', () => {
  let component: AddSlidesComponent;
  let fixture: ComponentFixture<AddSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSlidesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
