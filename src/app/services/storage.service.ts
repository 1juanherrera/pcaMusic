import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
      const storage = await this.storage.create();
      this._storage = storage;
  }

  private async ready(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
  } 

  public async set(key: string, value: any): Promise<void> {
    await this.ready();
    return this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.ready();
    return this._storage?.get(key);
  }

  public async remove(key: string): Promise<void> {
    await this.ready();
    return this._storage?.remove(key);
  }

  public async clear(): Promise<void> {
    await this.ready();
    return this._storage?.clear();
  }

  public async keys(): Promise<string[]> {
    await this.ready();
    return this._storage?.keys() || [];
  }

  public async length(): Promise<number> {
    await this.ready();
    return this._storage?.length() || 0;
  }
}
