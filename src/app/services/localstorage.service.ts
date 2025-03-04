import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public save(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const saved = localStorage.getItem(key);

    if (saved) return JSON.parse(saved);
    return null;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}
