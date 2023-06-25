import { Component } from '@angular/core';
import { Howl } from 'howler';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  radioPlayer: Howl;

  constructor(
    private navCtrl: NavController
  ) {
    this.radioPlayer = new Howl({
      src: ['https://radiomars.ice.infomaniak.ch/radiomars-128.mp3'],
      html5: true,
      format: ['mp3', 'aac'],
      autoplay: false
    });
  }

  playRadio() {
    this.radioPlayer.play();
  }

  pauseRadio() {
    this.radioPlayer.pause();
  }

  stopRadio() {
    this.radioPlayer.stop();
  }

  openRadioDetails() {
    this.navCtrl.navigateForward('radio-details');
  }

}
