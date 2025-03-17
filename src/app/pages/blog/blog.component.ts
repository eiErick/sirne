import { Component, computed, effect, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Thumbnail } from '../../models/blog';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { NavigateService } from '../../services/navigate.service';
import { BlogService } from '../../services/blog.service';
import { SchoolService } from '../../services/school.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../components/post-dialog/post-dialog.component';

@Component({
  selector: 'app-blog',
  imports: [
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatButtonToggleModule,
    DatePipe,
    MatButton,
    DecimalPipe
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  public searchTerm: string = '';
  
  public posts = computed(() => this.blogService.posts());
  public thumbnails = computed(() => this.blogService.thumbnails());
  public filterThumbnails = signal<Thumbnail[]>([]);

  constructor (
    public school: SchoolService,
    private blogService: BlogService,
    private navigate: NavigateService,
    private dialog: MatDialog,
  ) {
    effect(() => this.search(this.searchTerm));
  }

  public search(term: string) {
    this.filterThumbnails.update(() => [ ...this.thumbnails().filter((thumbnail) => thumbnail.title.toLowerCase().includes(term.toLowerCase())) ]);
  }

  public newPost() {
    this.navigate.post();
  }

  public openPost(code: string) {
    const post = this.posts().find((post) => post.code === code);

    if (post) {
      this.dialog.open(PostDialogComponent, {
        data: post,
      });
    }
  }

  public changeTab(menu: 'blog' | 'student') {
    if (menu === 'blog') this.navigate.blog();
    else this.navigate.home();
  }
}
