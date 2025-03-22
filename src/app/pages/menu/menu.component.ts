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
import { Lunch, Menu, Snack } from '../../models/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { DialogConfirmDeleteComponent } from '../../components/dialog-confirm-delete/dialog-confirm-delete.component';
import { MealDialogOpen } from '../../components/dialog-create-meal/dialog-create-meal.component';

@Component({
  selector: 'app-menu',
  imports: [
    MatIconModule,
    FormsModule,
    MatButtonModule,
    NavBarComponent,
    UpperCasePipe,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatListModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public menus = computed(() => this.menuService.menu());
  public snacks = computed(() => this.menuService.snacks());
  public lunches = computed(() => this.menuService.lunches());

  public select: 'menu' | 'database' = 'menu';
  public databaseType: 'snack' | 'lunch' = 'snack';

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
    const mealDialogOpen: MealDialogOpen = { 
      snack: { name: '', calories: 0, gluten: false, lactose: false, id: '' },
      lunch: { name: '', calories: 0, gluten: false, id: '' },
    };

    const dialogRef = this.dialog.open(DialogCreateMealComponent, {
      data: mealDialogOpen,
    });

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

  public editSnack(snack: Snack) {
    const mealDialogOpen: MealDialogOpen = { snack: { ...snack }, lunch: { name: '', calories: 0, gluten: false, id: '' }};

    const dialogRef = this.dialog.open(DialogCreateMealComponent, {
      data: mealDialogOpen,
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.menuService.updateSnacks(res.meal);
      }
    });
  }

  public editLunch(lunch: Lunch) {
    const mealDialogOpen: MealDialogOpen = { lunch: { ...lunch }, snack: { name: '', calories: 0, gluten: false, lactose: false, id: '' }};

    const dialogRef = this.dialog.open(DialogCreateMealComponent, {
      data: mealDialogOpen,
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {        
        this.menuService.updateLunch(res.meal);
      }
    });
  }

  public deleteSnack(snack: Snack) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
      data: snack.name,
    });
    
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === true) {
          this.menuService.deleteSnack(snack);
        }
      }
    });
  }

  public deleteLunch(lunch: Lunch) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
      data: lunch.name,
    });
    
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === true) {
          this.menuService.deleteLuch(lunch);
        }
      }
    });
  }
}
