import { Injectable } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';


@Injectable()
export class OnesignalProvider {
  Notifica = ""
  constructor(
    protected platform: Platform,
    protected Storage: Storage,
    protected modalCtrl: ModalController,
    protected oneSignal: OneSignal) { }
  inicio() {
    if (this.platform.is('core')) {
      return;
    }
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None)

    this.oneSignal.startInit('afd6aff9-e29e-49eb-aa78-e67cd4c4cf58', '564569378423');
    this.oneSignal.handleNotificationOpened().subscribe((notificacao => {

    }))
    this.oneSignal.handleNotificationReceived().subscribe(notificacao => {

    })
    this.oneSignal.getIds().then((ids => {
      this.Storage.set("RegistroId",ids.userId)
    }))
    this.oneSignal.endInit();
  }
}
