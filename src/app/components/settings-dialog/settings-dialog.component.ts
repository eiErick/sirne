import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SettingsDialogComponent>)

  public close() {
    this.dialogRef.close();
  }
}
