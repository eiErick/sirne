import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateStudentComponent } from './dialog-create-student.component';

describe('DialogCreateStudentComponent', () => {
  let component: DialogCreateStudentComponent;
  let fixture: ComponentFixture<DialogCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
