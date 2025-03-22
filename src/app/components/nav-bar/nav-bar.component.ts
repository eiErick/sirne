import { Component, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public valueDefault = input<'blog' | 'student' | 'menu'>('blog');

  constructor (
    private navigateService: NavigateService
  ) {}

  public changeTab(menu: 'blog' | 'student' | 'menu') {
    switch (menu) {
      case 'blog':
        this.navigateService.blog();
        break;
      case 'student':
        this.navigateService.home();
        break;
      case 'menu':
        this.navigateService.menu();
    }
  }
}
