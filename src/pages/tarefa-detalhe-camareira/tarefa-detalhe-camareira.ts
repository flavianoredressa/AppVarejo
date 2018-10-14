import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';


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
    public view: ViewController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public _firebase: FirebaseProvider,
    public navParams: NavParams) {
      
    this.chamado = this.navParams.data;
    this._firebase.getByKey("chamado", this.chamado.$key).subscribe(res => {
      this.chamado = res;
      this.check();
      this.ordenacao();
    })
  }
  ordenacao() {
    this.chamado.tarefas = this.chamado.tarefas.sort((a, b) => {
      var A = a.titulo.toLowerCase();
      var B = b.titulo.toLowerCase();
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    })
  }
  ionViewDidLoad() {
  }
  check() {
    var total = this.chamado.tarefas.length
    this.taferasFeita = 0
    this.chamado.tarefas.forEach(element => {
      if (element.feito)
        this.taferasFeita++
    });
    this.width = this.taferasFeita / total * 100
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
    this.check();
    if (this.chamado.tarefas.length == this.taferasFeita) {
      this.chamado.checkout = new Date()
      this.chamado.status = "3";
    }
    else
      this.chamado.status = "2";
    let key = this.chamado.$key + "";
    delete this.chamado.$key
    this.storage.get("usuario").then(res => {
      this.chamado.pegouId = res.$key;
      this._firebase.update("chamado", key, this.chamado).then(res => { })
    })
  }
  concluir() {
    this.view.dismiss()
  }

}
