import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Lunch, Menu, Snack } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-nutritional-info-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './nutritional-info-dialog.component.html',
  styleUrl: './nutritional-info-dialog.component.scss'
})
export class NutritionalInfoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NutritionalInfoDialogComponent>);

  public nutritionalInfo = inject<Menu>(MAT_DIALOG_DATA);

  public snack: Snack = { name: '', calories: 0, gluten: false, id: '', lactose: false };
  public lunch: Lunch = { name: '', calories: 0, gluten: false, id: '' };

  constructor (
    private menuService: MenuService,
  ) {
    const snack = menuService.getSnackId(this.nutritionalInfo.idSnack);
    const lunch = menuService.getSnackId(this.nutritionalInfo.idLunch);

    if (snack) {
      this.snack = snack;
    }

    if (lunch) {
      this.lunch = lunch;
    }
  }

  public close() {
    this.dialogRef.close();
  }
}