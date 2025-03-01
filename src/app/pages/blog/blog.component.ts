import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { School } from '../../models/school';
import { Thumbnail } from '../../models/blog';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { NavigateService } from '../../services/navigate.service';
import { BlogService } from '../../services/blog.service';

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
  
  public school: School;
  public thumbnails: Thumbnail[] = [];
  public filterThumbnails: Thumbnail[] = [];

  constructor (
    private navigate: NavigateService,
    private blog: BlogService,
  ) {
    this.school = { name: 'ESCOLA', SIE: '123', technique: true, unity: 3 };

    this.thumbnails = [ ...this.blog.thumbnails ];
    this.filterThumbnails = [ ...this.blog.thumbnails ];
  }

  public search(term: string) {
    this.filterThumbnails = [ ...this.thumbnails.filter((thumbnail) => thumbnail.title.toLowerCase().includes(term.toLowerCase())) ];
  }

  public newPost() {
    this.navigate.post();
  }

  public changeTab(menu: 'blog' | 'student') {
    if (menu === 'blog') this.navigate.blog();
    else this.navigate.home();
  }
}
