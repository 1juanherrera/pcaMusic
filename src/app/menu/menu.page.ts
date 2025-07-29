import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, RouterModule ],
})
export class MenuPage {
  constructor(private storageService: StorageService, private router: Router, private menu: MenuController) {}

  async logout() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
      await this.storageService.remove('login');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  closeMenu() {
    this.menu.close();
  }
}
