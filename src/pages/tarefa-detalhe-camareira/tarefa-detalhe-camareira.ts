import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-tarefa-detalhe-camareira',
  templateUrl: 'tarefa-detalhe-camareira.html',
})
export class TarefaDetalheCamareiraPage {
  private width: number = 0;
  private taferasFeita: number = 0;
  private chamado: any = []
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public _firebase: FirebaseProvider,
    public navParams: NavParams) {
    this.chamado = this.navParams.data;
    this._firebase.getByKey("chamado",this.chamado.$key).subscribe(res=>{
      this.chamado = res;
      this.check()
    })

  }

  ionViewDidLoad() {
  }
  check() {
    var total = this.chamado.tarefas.length
    var tarefaFeita = 0
    this.chamado.tarefas.forEach(element => {
      if(element.feito)
      tarefaFeita++
    });
    this.width = tarefaFeita/total*100
    if (this.taferasFeita == 1)
      this.chamado.checkin = new Date()
  }
  verificaTarefa() {
    if (this.taferasFeita > 0 && this.chamado.tarefas.length == this.taferasFeita)
      return true
    else
      return false
  }
  enviar() {
    let load = this.loadingCtrl.create();
    load.present();
    if (this.chamado.tarefas.length == this.taferasFeita)
      this.chamado.status = "3";
    else
      this.chamado.status = "2";
    this.chamado.checkout = new Date()
    let key = this.chamado.$key + "";
    delete this.chamado.$key
    this.storage.get("usuario").then(res => {
      this.chamado.pegouId = res.$key;
      this._firebase.update("chamado", key, this.chamado).then(res => {
        this.navCtrl.setRoot(TabsPage)
        load.dismiss();
      })
    })
  }

}
