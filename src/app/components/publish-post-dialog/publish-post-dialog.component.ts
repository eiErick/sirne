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

  public temporaryPost: boolean = false;

  constructor () {}

  public cancel() {
    this.dialogRef.close();
  }
}
