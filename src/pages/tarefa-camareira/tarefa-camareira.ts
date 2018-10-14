import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToastProvider } from '../../providers/toast/toast';
import { DomSanitizer } from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-tarefa-camareira',
  templateUrl: 'tarefa-camareira.html',
})
export class TarefaCamareiraPage {
  @ViewChild(Slides) slides: Slides;
  private chamado: any = {};
  private servico: any = [];
  private editando = false;
  constructor(
    public navCtrl: NavController,
    public _toast: ToastProvider,
    public view: ViewController,
    public _firebase: FirebaseProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    if (this.navParams.data != null && this.navParams.data.tarefas) {
      this.chamado = this.navParams.data;
      this.editando = true;
    }
    else
      this.chamado.urgente = false;
  }
  ionViewDidLoad() {
    let load = this.loadingCtrl.create({
      content: "Buscado",
      spinner: "ios"
    });
    load.present();
    this._firebase.getServico(4).subscribe((res: any) => {
      this.servico = res;
      if(this.chamado.tarefas){
        this.chamado.tarefas.forEach(element => {
          let aux = this.servico.find(x => x.$key == element.servicoId)
          if(aux)
          aux.ativo=true;
        });
      }
      load.dismiss();
    })
    if (!this.chamado.tarefas)
      this.AdicionarNumeroQuarto()
    this.slides.lockSwipes(true)
  }
  AdicionarNumeroQuarto() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Atenção',
      message: "Informe o numero do quarto!",
      inputs: [
        {
          name: 'quarto',
          placeholder: 'Nº Quarto',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.view.dismiss()
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            if (data.quarto == "") {
              this.AdicionarNumeroQuarto()
            }
            else {
              this.chamado.apartamento = data.quarto
            }
          }
        }
      ]
    });
    alert.present()
  }
  ControlSlide(tipo) {
    this.slides.lockSwipes(false)
    if (tipo == 1) {
      this.slides.slideNext(1000)
    }
    else
      this.slides.slidePrev(1000)
    this.slides.lockSwipes(true)
  }
  enviar() {
    let load = this.loadingCtrl.create({
      content: "Salvando",
      spinner: "ios"
    });
    load.present();

    this.storage.get("usuario").then(res => {
      if (this.editando) {
        this.chamado.user = res.$key;
        this.chamado.status = "1";
        this.chamado.tarefas = [];
        let aux: any = {};
        this.servico.forEach(element => {
          if (element.ativo) {
            aux = {};
            aux.feito = false;
            aux.servicoId = element.$key;
            aux.titulo = element.titulo;
            this.chamado.tarefas.push(aux)
          }
        });
        let chave = this.chamado.$key;
        delete this.chamado.$key;
        this._firebase.update("chamado", chave, this.chamado).then(res => {
          this.chamado.$key = chave;
          load.dismiss();
          this.view.dismiss()
        })
      }
      else {
        this.chamado.tipo = 4;
        this.chamado.user = res.$key;
        this.chamado.status = "1";
        this.chamado.datacadastro = new Date()
        this.chamado.checkin = null
        this.chamado.checkout = null
        this.chamado.tarefas = [];
        let aux: any = {};
        this.servico.forEach(element => {
          if (element.ativo) {
            aux = {};
            aux.feito = false;
            aux.servicoId = element.$key;
            aux.titulo = element.titulo;
            this.chamado.tarefas.push(aux)
          }
        });
        this._firebase.save("chamado", this.chamado).then(res => {
          load.dismiss();
          this.view.dismiss()
        })
      }

    })
  }

}
