import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { NavigateService } from '../../services/navigate.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  public student: Student;
  public change: boolean = false;

  public dataStudentOpen: 'open' | 'close' = 'open';

  constructor (
    private navigate: NavigateService,
    private studentService: StudentService
  ) {
    this.student = history.state;
  }

  public backHome() {
    this.navigate.home();
  }

  public confirm(form: NgForm) {
    if (form.valid) {
      this.studentService.editStudent(this.student.siu, this.student);
    }
  }
}
