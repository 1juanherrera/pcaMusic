import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IntroPage implements OnInit {
  introSeen: any = null;

  constructor(
    private storageService: StorageService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  async ngOnInit() {
    this.introSeen = await this.storageService.get('introSeen');
    await this.themeService.loadTheme();
  }

  async goBack() {
    console.log('Navigating back to home');
    await this.storageService.set('introSeen', true);
    this.introSeen = true;
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
