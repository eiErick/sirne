import { Component, computed } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public school = computed(() => this.schoolService.school());

  constructor (
    private schoolService: SchoolService,
    private dialog: MatDialog,
  ) {}


  public logout() {
    this.schoolService.logout();
  }

  public openSetting() {
    this.dialog.open(SettingsDialogComponent);
  }
}
