import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {

  songs: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navParams.get('songs');
    console.log('Songs received in modal:', this.songs);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async selectSong(song:any){
    await this.modalCtrl.dismiss(song);
  }

}
