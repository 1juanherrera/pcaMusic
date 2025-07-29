import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        await this.authService.registerUser(this.registerForm.value);
        await this.storageService.set('user', this.registerForm.value);
        await this.storageService.set('login', true);
        this.errorMessage = '';
        this.router.navigate(['/intro']);
      } catch (err) {
        this.errorMessage = typeof err === 'string' ? err : (err && typeof err === 'object' && 'message' in err ? (err as any).message : String(err) || 'Error desconocido');
      }
    } else {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
