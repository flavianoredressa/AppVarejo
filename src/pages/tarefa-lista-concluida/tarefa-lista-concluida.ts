import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TarefaListaConcluidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefa-lista-concluida',
  templateUrl: 'tarefa-lista-concluida.html',
})
export class TarefaListaConcluidaPage {
  protected listaTarefa = [];
  protected usuario: any = {};
  constructor(
    protected navCtrl: NavController,
    protected storage: Storage,
    protected loadingCtrl: LoadingController,
    protected _firebase: FirebaseProvider,
    protected navParams: NavParams) {
    this.Listar()
  }
  Listar() {
    let load = this.loadingCtrl.create({
      content: "Buscando",
      spinner: "ios"
    });
    load.present()
    this.storage.get("usuario").then(res => {
      if (res) {
        this.usuario = res;
        this._firebase.getAll('chamado')
          .subscribe((res: any) => {
            this.ordenacao(res)
            load.dismiss()
          })
      }
    })
  }
  ordenacao(res) {
    this.listaTarefa = res.sort((a, b) => {
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
  formataData(timestamp){
    return new Date(timestamp.seconds*1000)
  }
}
