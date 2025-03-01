import { inject, Injectable } from '@angular/core';
import { Post, Thumbnail } from '../models/blog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private _snackBar = inject(MatSnackBar);

  public posts: Post[] = [];
  public thumbnails: Thumbnail[] = [];

  constructor() {
    this.loadPosts();
    this.loadThumbnails();
  }

  private loadPosts() {
    const postsSaved = localStorage.getItem('posts');

    if (postsSaved) this.posts = JSON.parse(postsSaved) as Post[];
  }

  private loadThumbnails() {
    this.posts.forEach((item) => {
      this.thumbnails.push({
        assessment: item.assessment,
        code: item.code,
        date: item.date,
        title: item.title,
      });
    });
  }

  public savePost(post: Post) {
    post.code = this.makeID();
    this.posts.push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
    this._snackBar.open('Seu post foi salvo com sucesso!', 'Ok');
  }

  private saveAllPosts() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  public deletePost(code: number) {
    this.posts.forEach((post, index) => {
      if (post.code === code) {
        this.posts.splice(index, 1);
        this.saveAllPosts();
      }
    });
  }

  public makeID(): number {
    return Number(Date.now().toString(36) + Math.random().toString(36).substr(2, 5));
  }
}
