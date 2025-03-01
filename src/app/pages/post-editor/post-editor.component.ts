import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Post } from '../../models/blog';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { PublishPostDialogComponent } from '../../components/publish-post-dialog/publish-post-dialog.component';
import { CommonModule } from '@angular/common';
import { NavigateService } from '../../services/navigate.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post-editor',
  imports: [
    MatButton,
    FormsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.scss'
})
export class PostEditorComponent {
  public post: Post;

  readonly dialog = inject(MatDialog);

  constructor (
    private navigate: NavigateService,
    private blog: BlogService,
  ) {
    this.post = { title: '', assessment: 0, blog: '', code: 0, date: new Date(), endDate: null }
  }

  public openDialogPublish() {
    const dialogRef = this.dialog.open(PublishPostDialogComponent, {
      data: this.post,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.post.endDate = result.endDate;

      this.blog.savePost(this.post);
    });
  }

  public backHome() {
    this.navigate.home();
  }
}
