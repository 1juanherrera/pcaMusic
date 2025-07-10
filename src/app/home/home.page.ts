import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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
      image: 'https://acortar.link/qLjFzs',
      description: 'Disfruta de la energía del rock.'
    }
  ];

  constructor() { }

  ngOnInit() {
    // Detectar tema del sistema al iniciar
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateTheme();
  }

  // Alternar tema
  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
  }

  // Verificar si está en modo oscuro
  isDarkMode(): boolean {
    return this.darkMode;
  }

  // Aplicar el tema
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

  // Función para obtener el gradiente según el índice
  getGradient(index: number): string {
    const gradients = [
      'var(--gradient-classical)',
      'var(--gradient-jazz)', 
      'var(--gradient-rock)'
    ];
    return gradients[index % gradients.length];
  }
}

