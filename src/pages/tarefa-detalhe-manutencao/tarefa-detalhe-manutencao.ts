import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tarefa-detalhe-manutencao',
  templateUrl: 'tarefa-detalhe-manutencao.html',
})
export class TarefaDetalheManutencaoPage {
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
    })
  }
  ionViewDidLoad() {
    this.width = 0
  }
  check() {
    var total = this.chamado.tarefas.length
    this.taferasFeita = 0
    this.chamado.tarefas.forEach(element => {
      if (element.feito)
        this.taferasFeita++
    });
    this.width = this.taferasFeita / total * 100
    if (this.taferasFeita != total)
      this.chamado.concluido = false;

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
    if (this.taferasFeita == 0) {
      this.chamado.status = 1;
      delete this.chamado.pegouId
      delete this.chamado.pegouNome
    }
    else if (this.chamado.tarefas.length != this.taferasFeita) {
      this.chamado.status = 2;
    }
    
    let key = this.chamado.$key + "";
    delete this.chamado.$key
    this.storage.get("usuario").then(res => {
      this.chamado.pegouId = res.$key;
      this._firebase.update("chamado", key, this.chamado).then(res => { })
    })
  }
  concluir() {
    this.storage.get("usuario").then(res => {
      this.chamado.pegouId = res.$key;
      this.chamado.pegouNome = res.nome;
      this.chamado.checkout = new Date()
      this.chamado.status = 3;
      let key = this.chamado.$key + "";
      delete this.chamado.$key
      this._firebase.update("chamado", key, this.chamado).then(res => { this.view.dismiss() })
    })
  }
}
