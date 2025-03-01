import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { SuspendedComponent } from "../../components/suspended/suspended.component";
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-student',
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SuspendedComponent
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
  ) {
    this.student = history.state;
  }

  public backHome() {
    this.navigate.home();
  }

  public confirm(form: NgForm) {
    console.log(form.value)
  }
}
