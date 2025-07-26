import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class IntroGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const introSeen = await this.storage.get('introSeen');
    if (!introSeen) {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
    return true;
  }
}
