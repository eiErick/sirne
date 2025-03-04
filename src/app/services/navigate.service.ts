import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  constructor(
    private router: Router,
  ) { }

  public home() {
    this.router.navigate(['']);
  }

  public blog() {
    this.router.navigate(['blog']);
  }

  public post() {
    this.router.navigate(['post-editor']);
  }

  public student(student: Student) {    
    this.router.navigate(['student'], { state: student });
  }

  public login() {
    this.router.navigate(['login']);
  }
}
