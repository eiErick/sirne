import { Component, computed } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chips-nav-bar',
  imports: [
    CommonModule
  ],
  templateUrl: './chips-nav-bar.component.html',
  styleUrl: './chips-nav-bar.component.scss'
})
export class ChipsNavBarComponent {
  public value = computed(() => this.navBarService.value());

  constructor (
    private navBarService: NavBarService,
  ) {}

  public changeTab(tab: 'student' | 'blog' | 'menu') {
    this.navBarService.changeTab(tab);
  }
}
