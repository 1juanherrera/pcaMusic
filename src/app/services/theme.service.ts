import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = false;

  constructor(private storageService: StorageService) {}

  async loadTheme() {
    const savedTheme = await this.storageService.get('darkMode');
    if (savedTheme !== null) {
      this.darkMode = savedTheme;
      this.updateTheme();
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  async toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
    await this.storageService.set('darkMode', this.darkMode);
  }

  private updateTheme() {
    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
