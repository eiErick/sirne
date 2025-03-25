import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../models/blog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-publish-post-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './publish-post-dialog.component.html',
  styleUrl: './publish-post-dialog.component.scss'
})
export class PublishPostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PublishPostDialogComponent>);

  public post = inject<Post>(MAT_DIALOG_DATA);
  public publish = model(this.post);

  public temporaryDate: Date = new Date();
  public temporaryPost: boolean = false;
  public temporaryDateValid: boolean = true;

  constructor () {}

  public setTemporaryDate() {
    const currentDate: Date = new Date();
    const selectedDate: Date = new Date(this.temporaryDate);

    currentDate.setHours(0, 0, 0);
    selectedDate.setHours(0, 0, 0);

    if (selectedDate > currentDate) {
      this.temporaryDateValid = true;
      this.post.endDate = selectedDate;
    } else {
      this.temporaryDateValid = false;
      this.post.endDate = null;
    }    
  }

  public cancel() {
    this.dialogRef.close();
  }
}
