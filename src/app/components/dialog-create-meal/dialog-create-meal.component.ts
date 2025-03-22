import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Lunch, Snack } from '../../models/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-create-meal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-create-meal.component.html',
  styleUrl: './dialog-create-meal.component.scss'
})
export class DialogCreateMealComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCreateMealComponent>);
  
  public select: 'snack' | 'lunch' = 'snack';
  
  public snack: Snack = { name: '', calories: 0, gluten: false, lactose: false, id: '' };
  public lunch: Lunch = { name: '', calories: 0, gluten: false, id: ''};

  public saveLunch = model(this.lunch);
  public saveSnack = model(this.snack);

  public cancel() {
    this.dialogRef.close();
  }

  public add() {
    if (this.select === 'snack') {
      this.dialogRef.close({ type: 'snack', meal: this.snack });
    } else {
      this.dialogRef.close({ type: 'lunch', meal: this.lunch });
    }
  }
}

export interface MealDialogClose {
  type: 'snack' | 'lunch';
  meal: Snack | Lunch;
}
