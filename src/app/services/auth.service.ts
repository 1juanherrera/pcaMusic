
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(credentials: any) {
    return new Promise((resolve, reject) => {
      if (credentials.email === 'juan@example.com' && credentials.password === '12345678') {
        resolve('Login exitoso');
      } else {
        reject('Login incorrecto');
      }
    });
  }

  registerUser(data: any) {
    return new Promise((resolve, reject) => {
      // Simulación: si el email no es 'existe@example.com', acepta el registro
      if (data.email !== 'existe@example.com') {
        resolve('Registro exitoso');
      } else {
        reject('El usuario ya existe');
      }
    });
  }
}