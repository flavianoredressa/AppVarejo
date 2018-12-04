import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ListaApartamento: any = []
  constructor(protected navCtrl: NavController, protected _fireabse: FirebaseProvider) {
  }
  ionViewDidLoad() {
    this._fireabse.getAll('apartamento')
      .subscribe((res: any) => {
        this.ordenacao(res)
      })
  }
  ordenacao(res) {
    this.ListaApartamento = res.sort((a, b) => {
      var A = a.status;
      var B = b.status;
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    })
  }
}
