import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-delete',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrl: './dialog-confirm-delete.component.scss'
})
export class DialogConfirmDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmDeleteComponent>);

  public itemDeleting = inject<string>(MAT_DIALOG_DATA);

  public cancel() {
    this.dialogRef.close();
  }

  public confirm() {
    this.dialogRef.close(true);
  }
}
