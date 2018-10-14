import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ListaApartamento:any =[]
  constructor(protected navCtrl: NavController, protected _fireabse: FirebaseProvider) {

  }
  ionViewDidLoad(){
    this._fireabse.getAll('apartamento')
    .subscribe((res:any)=>{
      this.ListaApartamento = res
    })
 }
}
