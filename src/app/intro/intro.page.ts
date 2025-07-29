import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ThemeService } from '../services/theme.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NgIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [provideIcons({ featherSun, featherMoon })]
})
export class IntroPage implements OnInit {
  introSeen: any = null;

  introSlides = [
    {
      titulo: 'Bienvenido a PcaMusic',
      descripcion: 'Descubre la mejor música y personaliza tu experiencia.',
      imagen: '../../assets/images/logoPcaMusic.png',
      destacado: true
    },
    {
      titulo: 'Explora géneros',
      descripcion: 'Clásica, Jazz, Rock, Pop y mucho más.',
      imagen: '../../assets/images/generos.png',
      destacado: false
    },
    {
      titulo: 'Crea tus playlists',
      descripcion: 'Guarda y organiza tus canciones favoritas.',
      imagen: '../../assets/images/crear.png',
      destacado: false
    },
    {
      titulo: 'Modo oscuro',
      descripcion: 'Activa el modo oscuro para cuidar tu vista.',
      imagen: './assets/images/intro4.png',
      destacado: false
    }
  ];

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
    this.router.navigateByUrl('/menu/home', { replaceUrl: true });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
