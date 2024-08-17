import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsByEventComponent } from './reservations-by-event.component';

describe('ReservationsByEventComponent', () => {
  let component: ReservationsByEventComponent;
  let fixture: ComponentFixture<ReservationsByEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsByEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsByEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
