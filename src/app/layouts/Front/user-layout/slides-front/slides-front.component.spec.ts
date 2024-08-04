import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesFrontComponent } from './slides-front.component';

describe('SlidesFrontComponent', () => {
  let component: SlidesFrontComponent;
  let fixture: ComponentFixture<SlidesFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
