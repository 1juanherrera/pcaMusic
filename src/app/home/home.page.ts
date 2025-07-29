import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSun, featherMoon, featherLogOut } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, NgIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [provideIcons({ featherSun, featherMoon, featherLogOut })]
})
export class HomePage implements OnInit {

  darkMode = false;

  genres = [
    {
      title: 'Música Clásica',
      image: './assets/images/clasica.png',
      description: 'Disfruta de la elegancia de la música clásica.'
    },
    {
      title: 'Jazz',
      image: './assets/images/jazz.png',
      description: 'Sumérgete en el ritmo del jazz.'
    },
    {
      title: 'Rock',
      image: './assets/images/rock.png',
      description: 'Disfruta de la energía del rock.'
    },
    {
      title: 'Pop',
      image: './assets/images/pop.png',
      description: 'Vibra con los éxitos del pop internacional.'
    }
  ];

  async resetIntro() {
    await this.storageService.remove('introSeen');
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  constructor(private storageService: StorageService, private router: Router) { }

  async ngOnInit() {
    await this.loadStorageData();
    this.simularCargaDatos();
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

  goIntro() {
    console.log('Navigating to intro');
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  async simularCargaDatos() { 
    const data = await this.obtenerDatosSimulados(); 
    console.log('Datos simulados cargados:', data);
  }

  async logout() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
      await this.storageService.remove('login');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Rock', 'Pop', 'Jazz', 'Clásica']);
      }, 1500);
    });
  }
}

