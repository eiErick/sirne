import { Injectable, signal } from '@angular/core';
import { NavigateService } from './navigate.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  public value = signal<'blog' | 'student' | 'menu'>('student');

  constructor (
    private navigateService: NavigateService
  ) { }

  public changeTab(menu: 'blog' | 'student' | 'menu') {    
    switch (menu) {
      case 'blog':
        this.value.set('blog');
        this.navigateService.blog();
        break;
        case 'student':
        this.value.set('student');
        this.navigateService.home();
        break;
        case 'menu':
        this.value.set('menu');
        this.navigateService.menu();
    }    
  }
}
