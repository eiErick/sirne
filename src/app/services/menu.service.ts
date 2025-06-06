import { Injectable, signal } from '@angular/core';
import { Lunch, Menu, MenuDatabase, Snack } from '../models/menu';
import { LocalstorageService } from './localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import Backendless from 'backendless';

const APP_ID = '';
const API_KEY = '';

Backendless.initApp(APP_ID, API_KEY);

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu = signal<Menu[]>([]);
  public lunches = signal<Lunch[]>([]);
  public snacks = signal<Snack[]>([]);
  public load = signal<boolean>(false);

  private NAME_SERVE_MENU = 'menu';
  private NAME_SERVE_MENU_DATABASE = 'menu-database';
  
  constructor(
    private localstorageService: LocalstorageService,
    private snackBar: MatSnackBar,
  ) {
    this.loadLocalMenu();
  }

  private loadLocalMenu() {
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

    // this.getServeMenu();
    // this.getServeMenuDatabase();
  }

  private getServeMenu() {
    this.load.set(true);
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const menu = res as Menu[];
        this.menu.set(menu);
        this.saveMenu();
        this.validateMenu();
      },
      complete: () => this.load.set(false),
    });
  }

  private getServeMenuDatabase() {
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const database = res as MenuDatabase[];

        let snacks: Snack[] = [];
        let lunches: Lunch[] = [];
        
        database.forEach((data) => {
          data.type === 'snack' ? snacks.push({ calories: data.calories, gluten: false, id: data.id, lactose: data.lactose, name: data.name }) : lunches.push({ calories: data.calories, gluten: false, id: data.id, name: data.name });
        });

        this.snacks.set(snacks);
        this.lunches.set(lunches);

        console.log(this.snacks());
        
      }
    });
  }

  private putServeMenu(menu: Menu) {
    const idMenu = (menu as any).objectId;

    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU).save({ ...menu, objectId: idMenu }).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {}
    });
  }

  private addDataDatabaseServer(data: MenuDatabase) {
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).save(data).then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {}
    });
  }

  private createServerTables() {    
    const tables: Menu[] = [
      { day: 'segunda', id: 'mon', idLunch: 'empty', idSnack: 'empty' },
      { day: 'terça', id: 'tue', idLunch: 'empty', idSnack: 'empty' },
      { day: 'quarta', id: 'wed', idLunch: 'empty', idSnack: 'empty' },
      { day: 'quinta', id: 'thu', idLunch: 'empty', idSnack: 'empty' },
      { day: 'sexta', id: 'fri', idLunch: 'empty', idSnack: 'empty' },
    ];

    tables.forEach((table) => {
      console.log(table);
      
      new Observable(observer => {
        Backendless.Data.of(this.NAME_SERVE_MENU).save(table).then(result => {
            observer.next(result);
            observer.complete();
          }).catch(error => observer.error(error));
      }).subscribe({
        next: (res) => {
          const menu = res as Menu[];
          this.menu.set(menu);
        }
      });
    });
  }

  private deleteAllMenusServer() {
    if (this.menu()) {
      this.createServerTables();
      return;
    }

    this.menu().forEach((menu) => {
      const id = menu as any;

      new Observable(observer => {
        Backendless.Data.of(this.NAME_SERVE_MENU).remove({ objectId: id.objectId }).then(result => {
          observer.next(result);
          observer.complete();
        }).catch(error => observer.error(error));
      }).subscribe({
        next: () => {          
          this.createServerTables();
        }
      });
    });
  }

  public validateMenu() {
    const zero = this.menu().length === 0;

    if (zero) {
      this.createServerTables();
    } 
  }

  public getSnackId(id: string): Snack | undefined {
    return this.snacks().find((snack) => snack.id === id);
  }

  public getLunchId(id: string): Lunch | undefined {
    return this.lunches().find((lunch) => lunch.id === id);
  }

  public addSnack(snack: Snack) {
    const snackFound = this.snacks().find((s) => s.name.toLowerCase() === snack.name.toLowerCase());
    
    if (snackFound) {
      this.snackBar.open('Esta merenda já está cadastrada!', 'Ok');
    } else {
      snack.id = this.makeID();

      const menuDatabase: MenuDatabase = { calories: snack.calories, id: snack.id, lactose: snack.lactose, name: snack.name, type: 'snack' };

      // this.addDataDatabaseServer(menuDatabase);
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

      const menuDatabase: MenuDatabase = { calories: lunch.calories, id: lunch.id, lactose: false, name: lunch.name, type: 'snack' };

      // this.addDataDatabaseServer(menuDatabase);
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
    // this.putServeMenu(newMenuDay);
    
    this.menu.update(menu => menu.map(m => m.id === newMenuDay.id ? { ...newMenuDay } : m));
    this.saveMenu();
  }

  public deleteLuch(lunch: Lunch) {
    this.lunches().forEach((l, index) => {
      if (l.id === lunch.id) {
        this.lunches.update(lunches => lunches.filter((item, i) => i !== index));
        this.saveMeals();
      }
    });
  }

  public deleteSnack(snack: Snack) {
    this.snacks().forEach((s, index) => {
      if (s.id === snack.id) {
        this.snacks.update(snacks => snacks.filter((item, i) => i !== index));
        this.saveMeals();
      }
    });
  }

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
