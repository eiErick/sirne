import { Injectable, signal } from '@angular/core';
import { Lunch, Menu, Snack } from '../models/menu';
import { LocalstorageService } from './localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu = signal<Menu[]>([]);
  public lunches = signal<Lunch[]>([]);
  public snacks = signal<Snack[]>([]);
  
  constructor(
    private localstorageService: LocalstorageService,
    private snackBar: MatSnackBar,
  ) {
    this.loadMenu();
  }

  private loadMenu() {
    const snacks = this.localstorageService.get('snacks');
    const lunches = this.localstorageService.get('lunches');
    const menu = this.localstorageService.get('menu');    

    if (snacks) {
      this.snacks.set(snacks);
    } else {
      this.snacks.set([{ name: '---', calories: 0, gluten: false, id: this.makeID(), lactose: false }]);
      this.saveMeals();
    }

    if (lunches) {
      this.lunches.set(lunches);
    } else {
      this.lunches.set([{ name: '---', calories: 0, gluten: false, id: this.makeID() }]);
      this.saveMeals();
    }

    if (menu) {
      this.menu.set(menu);
    } else {
      this.menu.set([
        { day: 'segunda', id: 'mon', idLunch: 'empty', idSnack: 'empty' },
        { day: 'terça', id: 'tue', idLunch: 'empty', idSnack: 'empty' },
        { day: 'quarta', id: 'wed', idLunch: 'empty', idSnack: 'empty' },
        { day: 'quinta', id: 'thu', idLunch: 'empty', idSnack: 'empty' },
        { day: 'sexta', id: 'fri', idLunch: 'empty', idSnack: 'empty' },
      ]);
      
      this.saveMenu();
    }
  }

  public addSnack(snack: Snack) {
    const snackFound = this.snacks().find((s) => s.name.toLowerCase() === snack.name.toLowerCase());
    
    if (snackFound) {
      this.snackBar.open('Esta merenda já está cadastrada!', 'Ok');
    } else {
      snack.id = this.makeID();
      this.snacks.update(snacks => [ ...snacks, snack ]);
      this.saveMeals();
    }
  }

  public addLunch(lunch: Lunch) {
    const lunchFound = this.lunches().find((l) => l.name.toLowerCase() === lunch.name.toLowerCase());

    if (lunchFound) {
      this.snackBar.open('Este almoço já está cadastrado!', 'ok');
    } else {
      lunch.id = this.makeID();
      this.lunches.update(lunches => [ ...lunches, lunch ]);
      this.saveMeals();
    }
  }

  public updateSnacks(snack: Snack) {    
    this.snacks.update(snacks => snacks.map(s => s.id === snack.id ? { ...snack } : s));
    this.saveMeals();
  }

  public updateLunch(lunch: Lunch) {
    this.lunches.update(lunches => lunches.map(l => l.id === lunch.id ? { ...lunch } : l));
    this.saveMeals();
  }

  public changeMenu(newMenuDay: Menu) {
    this.menu.update(menu => menu.map(m => m.id === newMenuDay.id ? { ...newMenuDay } : m));
    this.saveMenu();
  }

  public deleteLuch(lunch: Lunch) {
    this.lunches().forEach((l, index) => {
  private saveMenu() {
    this.localstorageService.save('menu', this.menu());
  }
  
  private saveMeals() {    
    this.localstorageService.save('lunches', this.lunches());
    this.localstorageService.save('snacks', this.snacks());
  }

  private makeID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
