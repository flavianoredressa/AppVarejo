import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class ToastProvider {

  constructor(protected toast: ToastController) {}

  present(message, cssClass = 'toastDefault') {
    let toast = this.toast.create({
      cssClass: cssClass,
      message: message,
      duration: 3000,
    });

    return toast.present();
  }
}
