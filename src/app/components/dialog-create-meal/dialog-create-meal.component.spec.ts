import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateMealComponent } from './dialog-create-meal.component';

describe('DialogCreateSnackLunchComponent', () => {
  let component: DialogCreateMealComponent;
  let fixture: ComponentFixture<DialogCreateMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
