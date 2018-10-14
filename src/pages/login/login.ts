import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { MascaraProvider } from '../../providers/mascara/mascara';
import { ToastProvider } from '../../providers/toast/toast';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  backgrounds = ['assets/imgs/fundo.png']
  cpf
  senha
  constructor(
    public Storage: Storage,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public _toast: ToastProvider,
    public _mascara: MascaraProvider,
    private _firebase: FirebaseProvider,
    public navParams: NavParams) {
  }
  Logar() {
    let load = this.loadingCtrl.create({
      content:"Verificando",
      spinner:"ios"
    });
    load.present();
    let cpfs=this.cpf.replace(".","").replace(".","").replace("-","")
    this._firebase.login(cpfs, this.senha).subscribe(res => {
      if (res && res.length > 0) {
        this.Storage.set("usuario", res[0])
        this.navCtrl.setRoot(TabsPage)
        load.dismiss()
      }
      else{
        load.dismiss()
        this._toast.present("CPF ou senha inválido !")
      }
    })
  }
  ResetSenha(){
    this._toast.present('Em Breve')
  }
  mascara(tipo) {
    switch (tipo) {
      case 1:
        this.cpf = this._mascara.MaskCPF(this.cpf);
        break;
      default:
        break;
    }
  }

}
