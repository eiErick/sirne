import { Component, computed } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NavBarService } from '../../services/nav-bar.service';

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
  public valueDefault = computed(() => this.navBarService.value());

  constructor (
    private navBarService: NavBarService,
  ) {}

  public changeTab(menu: 'blog' | 'student' | 'menu') {
    this.navBarService.changeTab(menu);
  }
}
