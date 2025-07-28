import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Router } from '@angular/router';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({ featherSun, featherMoon })]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup; 

  errorMessage: string = "";

  validation_messages = {
    email: [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'email', message: 'Ingrese un correo electrónico válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    public themeService: ThemeService,
    private authService: AuthService,
    private navCtrl: NavController
  ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.minLength(6)
      ]))
    });
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    await this.themeService.loadTheme();
  }

  async loginUser(value: any) {
    try {
      await this.authService.loginUser(value);
      this.errorMessage = "";
      await this.storageService.set('login', true);
      this.navCtrl.navigateForward('/home');
    } catch (err) {
      this.errorMessage = typeof err === 'string' ? err : (err && typeof err === 'object' && 'message' in err ? (err as any).message : String(err) || 'Error desconocido');
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
