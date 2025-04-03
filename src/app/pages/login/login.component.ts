import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth';
import { SchoolService } from '../../services/school.service';
import { School } from '../../models/school';

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
  public auth: Auth = { api_key: '', app_id: '', siu: '' };
  public password: string = '';

  constructor (
    private authService: AuthService,
    private schoolService: SchoolService,
  ) {}

  public login() {
    const school: School = { name: 'Escola', SIE: this.auth.siu, technique: true, unity: 3 };
    this.schoolService.setLocalSchool(school, this.password);
    this.authService.setLogin(this.auth, this.password);
  }
}
