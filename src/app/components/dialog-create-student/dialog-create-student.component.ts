import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Student } from '../../models/student';
import { School } from '../../models/school';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-create-student',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './dialog-create-student.component.html',
  styleUrl: './dialog-create-student.component.scss'
})
export class DialogCreateStudentComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCreateStudentComponent>);

  public student: Student = { name: '', class: '', course: { id: '', name: '' }, room: 0, shift: 'matutino', siu: '' };
  public saveStudent = model(this.student);

  public school: School;
  
  constructor() {
    this.school = { name: 'ESCOLA', SIE: '123', technique: true, unity: 3 }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
