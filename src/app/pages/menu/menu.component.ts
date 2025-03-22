import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SchoolService } from '../../services/school.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateMealComponent } from '../../components/dialog-create-meal/dialog-create-meal.component';
import { MenuService } from '../../services/menu.service';
import { UpperCasePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-menu',
  imports: [
    MatIconModule,
    FormsModule,
    MatButtonModule,
    NavBarComponent,
    UpperCasePipe,
    MatSelectModule,
    MatFormFieldModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public menus = computed(() => this.menuService.menu());
  public snacks = computed(() => this.menuService.snacks());
  public lunches = computed(() => this.menuService.lunches());

  constructor (
    public schoolService: SchoolService,
    private dialog: MatDialog,
    private menuService: MenuService,
  ) {
  }

  public changeMeal(menu: Menu, type: 'snack' | 'lunch', id: string) {
    const newMenu: Menu = menu;

    if (type === 'snack') {
      newMenu.idSnack = id;
    } else {
      newMenu.idLunch = id;
    }

    this.menuService.changeMenu(newMenu);
  }

  public openDialogCreateMeal() {
    const dialogRef = this.dialog.open(DialogCreateMealComponent);

    dialogRef.afterClosed().subscribe({
      next: (res) => {        
        if (res.type === 'snack') {
          this.menuService.addSnack(res.meal);
        } else {
          this.menuService.addLunch(res.meal);
        }
      }
    });
  }
}
