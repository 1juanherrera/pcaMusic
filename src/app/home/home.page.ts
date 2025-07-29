import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSun, featherMoon, featherLogOut } from '@ng-icons/feather-icons';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, NgIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [provideIcons({ featherSun, featherMoon })]
})
export class HomePage implements OnInit {

  darkMode = false;

  async resetIntro() {
    await this.storageService.remove('introSeen');
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  tracks: any;
  albums: any;
  localArtists: any;
  song: any = {
    name: '',
    preview_url: '',
    playing: false,
  };
  currentSong: any;
  newTime:any;
  
  constructor(
    private storageService: StorageService, 
    private router: Router,
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.loadStorageData();
    this.loadTracks();
    this.loadAlbums();
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log('Tracks:', this.tracks);
    });
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
    })
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
    }
  }

  goIntro() {
    console.log('Navigating to intro');
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  async showSongs(albumId: string) {
    console.log('Fetching songs for album:', albumId);
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log('Songs for album', albumId, ':', songs); 
    const modal= await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: { songs: songs }
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.song = result.data;
        console.log('Selected song:', this.song);
      }
    });
    await modal.present();
  }

  play() {
    if (this.currentSong) {
      this.currentSong.pause();
      this.currentSong.currentTime = 0;
    }
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
      this.song.currentTime = this.currentSong.currentTime;
      this.song.duration = this.currentSong.duration;
    });
    this.song.playing = true;
  }
  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = "0.00"){
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return null
  }
}

