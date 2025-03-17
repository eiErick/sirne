import { Injectable, signal } from '@angular/core';
import { Post, Thumbnail } from '../models/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public posts = signal<Post[]>([]);
  public thumbnails = signal<Thumbnail[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private localstorageService: LocalstorageService,
  ) {
    this.loadPosts();
    this.loadThumbnails();
  }

  private loadPosts() {
    const postsSaved = this.localstorageService.get('posts');
    if (postsSaved) this.posts.set(postsSaved);
  }

  private loadThumbnails() {
    this.clearThumbnails();
    this.posts().forEach((item) => {
      this.thumbnails.update(thumbnail => [ ...thumbnail, { assessment: item.assessment, code: item.code, date: item.date, title: item.title }]);
    });
  }

  public savePost(post: Post) {
    post.code = this.makeID().toString();
    this.posts.update(posts => [ post, ...posts ]);
    post.code = this.makeID().toString();
    
    this.saveAllPosts();
    this.snackBar.open('Seu post foi salvo com sucesso!', 'Ok');
  }
  
  private saveAllPosts() {
    this.localstorageService.save('posts', this.posts());
    this.loadThumbnails();
  }

  public deletePost(code: string) {
    this.posts().forEach((post, index) => {
      if (post.code === code) {
        this.posts.update(posts => posts.filter((item, i) => i !== index));
        this.saveAllPosts();
      }
    });
  }

  private clearThumbnails() {
    this.thumbnails.set([]);
  }

  public makeID(): number {
    const randomPortion = Math.floor(Math.random() * 1_000_000);
    return Date.now() * 1_000_000 + randomPortion;
  }
}
