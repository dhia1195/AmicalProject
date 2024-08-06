import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSlidesComponent } from './deleted-slides.component';

describe('DeletedSlidesComponent', () => {
  let component: DeletedSlidesComponent;
  let fixture: ComponentFixture<DeletedSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedSlidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
