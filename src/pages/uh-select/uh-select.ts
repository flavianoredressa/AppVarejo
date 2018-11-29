import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the UhSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uh-select',
  templateUrl: 'uh-select.html',
})
export class UhSelectPage {

  vilas = [];
  uhs = [];
  selectUh
  vila
  constructor(
    public navCtrl: NavController,
    public _firebase: FirebaseProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this._firebase.getAll("apartamento").subscribe(res => {
      res.forEach((element: any) => {
        if (element.referencia && this.vilas.indexOf(element.referencia) == -1)
          this.vilas.push(element.referencia)
      });
      this.vilas=res;
    })
  }
  
}
