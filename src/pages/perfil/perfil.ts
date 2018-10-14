import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  usuario:any
  constructor(public navCtrl: NavController, private storage: Storage, ) {
    this.getUser()
  }
  getUser() {
    this.storage.get("usuario").then(res => {
      this.usuario = res
    })
  }
  Sair(){
    localStorage.clear()
    this.navCtrl.parent.parent.setRoot('LoginPage')
  }
}
