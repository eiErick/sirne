import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../models/blog';

@Component({
  selector: 'app-post-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss'
})
export class PostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<Post>);

  public post = inject<Post>(MAT_DIALOG_DATA);

}
