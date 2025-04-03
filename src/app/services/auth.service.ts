import { Injectable, signal } from '@angular/core';
import { EncryptedstorageService } from './encryptedstorage.service';
import { Auth } from '../models/auth';
import { NavigateService } from './navigate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = signal<boolean>(this.hasToken());

  constructor (
    private encryptedstorageService: EncryptedstorageService,
    private navigateService: NavigateService,
  ) {}

  public isAuthenticated(): boolean {
    return this.authenticated();
  }

  public setLogin(auth: Auth, password: string) {
    this.encryptedstorageService.setEncryptionKey(password);
    this.encryptedstorageService.save('auth', auth);

    this.authenticated.set(true);
    this.navigateService.home();
  }

  private hasToken(): boolean {
    const auth = localStorage.getItem('auth');

    if (auth) {
      return true;
    } else {
      return false;
    }
  }
}
