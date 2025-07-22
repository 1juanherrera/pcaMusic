import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  darkMode = false;

  genres = [
    {
      title: 'Música Clásica',
      image: 'https://acortar.link/PmidZf',
      description: 'Disfruta de la elegancia de la música clásica.'
    },
    {
      title: 'Jazz',
      image: 'https://acortar.link/BDKPT4',
      description: 'Sumérgete en el ritmo del jazz.'
    },
    {
      title: 'Rock',
      image: 'https://acortar.link/RPjEzF',
      description: 'Disfruta de la energía del rock.'
    }
  ];

  constructor(private storageService: StorageService) { }

  async ngOnInit() {
    await this.loadStorageData();
  }

  async toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
    await this.storageService.set('darkMode', this.darkMode);
    console.log('Dark mode preference saved:', this.darkMode);
  }
 
  isDarkMode(): boolean {
    return this.darkMode;
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

  getGradient(index: number): string {
    const gradients = [
      'var(--gradient-classical)',
      'var(--gradient-jazz)', 
      'var(--gradient-rock)'
    ];
    return gradients[index % gradients.length];
  }

  async loadStorageData() {
    const savedTheme  = await this.storageService.get('darkMode');
    if (savedTheme !== null) {
      this.darkMode = savedTheme;
      this.updateTheme();
      console.log('Loaded dark mode preference:', this.darkMode);
    }
  }
}

