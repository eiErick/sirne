import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { Student, GroupedRoom } from '../../models/student';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NavigateService } from '../../services/navigate.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateStudentComponent } from '../../components/dialog-create-student/dialog-create-student.component';
import { StudentService } from '../../services/student.service';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from "../../components/profile/profile.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ChipsNavBarComponent } from "../../components/chips-nav-bar/chips-nav-bar.component";

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    ProfileComponent,
    NavBarComponent,
    ChipsNavBarComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public searchTerm: string = '';
  public filterType: 'room' | 'student' = 'room';

  public students: Student[] = [];
  public filteredStudents: Student[] = [];
  public studentsOrganizedByRoom: GroupedRoom[] = [];

  private dialog = inject(MatDialog);

  constructor (
    private navigate: NavigateService,
    private student: StudentService,
  ) {}
  
  ngOnInit(): void {
    this.students = [ ...this.student.students ];
    this.filteredStudents = [ ...this.student.students ];

    this.studentsOrganizedByRoom = this.getStudentsGroupedByRoom();
  }

  private getStudentsGroupedByRoom(): GroupedRoom[] {
    const groupedRoomsMap: { [key: number]: Student[] } = {};

    this.students.forEach(student => {
      if (!groupedRoomsMap[student.room]) groupedRoomsMap[student.room] = [];
      groupedRoomsMap[student.room].push(student);
    });

    return Object.keys(groupedRoomsMap).map(roomNumber => ({
      room: Number(roomNumber),
      students: groupedRoomsMap[Number(roomNumber)]
    }));
  }

  public search(term: string) {    
    this.filteredStudents = [ ...this.students.filter((student) => student.name.toLowerCase().includes(term.toLowerCase())) ];
  }

  public editStudent(student: Student) {    
    this.navigate.student(student);
  }

  public openDialogCreateStudent() {
    const dialogRef = this.dialog.open(DialogCreateStudentComponent);

    dialogRef.afterClosed().subscribe(result => {            
      if (!result) return;
      this.student.saveStudents(result);
      this.students.push(result);
      this.filteredStudents.push(result);
      this.studentsOrganizedByRoom = this.getStudentsGroupedByRoom();
    });
  }
}
