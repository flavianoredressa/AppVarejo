import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  constructor(
    protected navCtrl: NavController, 
    // protected pService: NgProgress,
    protected _camera:CameraProvider) {
    // this.navCtrl.push("TarefaCamareiraPage")
    //this.navCtrl.push("LoginPage")

  }
  ionViewDidEnter(){
    // this.pService.start();

  }
}
