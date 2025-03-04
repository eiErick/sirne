import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NavigateService } from '../../services/navigate.service';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public hash: string = '';
  public password: string = '';

  constructor (
    private navigate: NavigateService,
    private school: SchoolService,
  ) {}

  public login() {
    this.school.setLocalSchool({ name: 'ESCOLA', SIE: this.hash, technique: true, unity: 3 }, this.password);
    this.navigate.home();
  }
}
