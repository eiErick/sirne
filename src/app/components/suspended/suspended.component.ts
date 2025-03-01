import { Component, HostListener, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-suspended',
  imports: [
    MatIconModule
  ],
  templateUrl: './suspended.component.html',
  styleUrl: './suspended.component.scss'
})
export class SuspendedComponent {
  public title = input.required<string>();
  public open = input(true);
  
  public state = output<'open' | 'close'>();

  public isOpen: boolean;

  constructor () {
    this.isOpen = this.open();
  }

  @HostListener('click')
  click () {
    this.toggleState();
  }

  public toggleState() {
    if (this.isOpen) {
      this.state.emit('close');
      this.isOpen = false;
    } else {
      this.state.emit('open');
      this.isOpen = true;
    }
  }
}
