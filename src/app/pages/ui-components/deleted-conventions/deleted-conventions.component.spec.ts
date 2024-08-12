import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedConventionsComponent } from './deleted-conventions.component';

describe('DeletedConventionsComponent', () => {
  let component: DeletedConventionsComponent;
  let fixture: ComponentFixture<DeletedConventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedConventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
