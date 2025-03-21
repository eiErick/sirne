import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public students: Student[] = [];

  constructor() {
    this.loadStudents();
  }

  private loadStudents() {
    const studentsSaved = localStorage.getItem('students');

    if (studentsSaved) this.students = JSON.parse(studentsSaved) as Student[];
  }

  public saveStudents(student: Student) {
    student.siu = this.makeID();
    this.students.push(student);
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  private saveAllStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  public editStudent(siu: string, studentAtualizado: Student) {
    this.students.forEach((student, index) => {
      if (student.siu === siu) {
        this.students[index] = { ...studentAtualizado };
        this.saveAllStudents();
      }
    });    
  }

  public deletePost(siu: string) {
    this.students.forEach((student, index) => {
      if (student.siu === siu) {
        this.students.splice(index, 1);
        this.saveAllStudents();
      }
    });
  }

  public makeID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
