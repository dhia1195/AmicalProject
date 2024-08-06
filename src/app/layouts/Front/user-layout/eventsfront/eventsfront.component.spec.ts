import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsfrontComponent } from './eventsfront.component';

describe('EventsfrontComponent', () => {
  let component: EventsfrontComponent;
  let fixture: ComponentFixture<EventsfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
