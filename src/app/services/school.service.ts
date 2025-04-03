import { inject, Injectable, OnInit, Signal, signal } from '@angular/core';
import { School } from '../models/school';
import { EncryptedstorageService } from './encryptedstorage.service';
import { PasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigateService } from './navigate.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public school = signal<School>({
    name: '',
    SIE: '',
    technique: false,
    unity: 0.
  });

  private dialog = inject(MatDialog);
  
  constructor(
    private encryptedstorage: EncryptedstorageService,
    private navigateService: NavigateService,
    private authService: AuthService,
  ) {
    this.getLocalSchool();
  }
  
  public async getLocalSchool() {
    if (this.authService.isAuthenticated()) {
      console.log(1);
      
      const password = await this.passwordDialog();
      this.encryptedstorage.setEncryptionKey(password);
      
      const schoolSaved = this.encryptedstorage.get('school');
      
      this.school.set(schoolSaved);
    }
  }

  private async passwordDialog(): Promise<string> {
    const dialogRef = this.dialog.open(PasswordDialogComponent);
    const result = await dialogRef.afterClosed().toPromise();
    
    return result;
  }

  public async logout() {
    const password = await this.passwordDialog();
    if (this.encryptedstorage.validPassword(password)) {
      this.removeLocalShool();
      this.navigateService.login();
    }
  }

  public setLocalSchool(school: School, password: string) {
    this.encryptedstorage.setEncryptionKey(password);
    this.encryptedstorage.save('school', school);
  }

  public removeLocalShool() {
    this.encryptedstorage.remove('school');
  }
}
