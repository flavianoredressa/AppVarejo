import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-tarefa-camareira',
  templateUrl: 'tarefa-camareira.html',
})
export class TarefaCamareiraPage {
  @ViewChild(Slides) slides: Slides;
  protected chamado: any = {};
  protected servico: any = [];
  protected editando = false;
  protected vilas = [];
  protected vila;
  protected uhs = [];
  protected uhsALL = [];
  protected selectUh

  constructor(
    protected navCtrl: NavController,
    protected _toast: ToastProvider,
    protected view: ViewController,
    protected _firebase: FirebaseProvider,
    protected storage: Storage,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected navParams: NavParams) {
    if (this.navParams.data != null && this.navParams.data.tarefas) {
      this.chamado = this.navParams.data;
      this.editando = true;
    }
    else
      this.chamado.urgente = false;
  }
  seleciona() {
    debugger
    this.selectUh=JSON.parse(this.selectUh);
    this.chamado.apartamentoId = this.selectUh.$key;
    this.selectUh=this.selectUh.numero
  }
  selectObjectById(list: any[], id: string, property: string) {
    var item = list.find(item => item._id === id);
    var prop = eval('this.' + property);
    prop = property;
}
  getVila() {
    let aux = [];
    this.uhsALL.forEach(element => {
      if (element.referencia == this.vila)
        aux.push(element)
    });
    this.uhs = aux;
    this.selectUh = null;
  }
  ionViewDidLoad() {
    let load = this.loadingCtrl.create({
      content: "Buscado",
      spinner: "ios"
    });
    load.present();
    this._firebase.getAll("apartamento").subscribe(res => {
      res.forEach((element: any) => {
        if (element.referencia && this.vilas.indexOf(element.referencia) == -1)
          this.vilas.push(element.referencia)
      });
      this.uhs = res;
      this.uhsALL = res;

    })
    this._firebase.getServico(4).subscribe((res: any) => {
      this.servico = res;
      this.ordenacao();
      if (this.chamado.tarefas) {
        this.chamado.tarefas.forEach(element => {
          let aux = this.servico.find(x => x.$key == element.servicoId)
          if (aux)
            aux.ativo = true;
        });
      }
      load.dismiss();
    })
    // if (!this.chamado.tarefas)
    // this.AdicionarNumeroQuarto()
    this.slides.lockSwipes(true)
  }
  ordenacao() {
    this.servico = this.servico.sort((a, b) => {
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
  // AdicionarNumeroQuarto() {
  //   let alert = this.alertCtrl.create({
  //     enableBackdropDismiss: false,
  //     title: 'Atenção',
  //     message: "Informe o numero do quarto!",
  //     inputs: [
  //       {
  //         name: 'quarto',
  //         placeholder: 'Nº Quarto',
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: data => {
  //           this.view.dismiss()
  //         }
  //       },
  //       {
  //         text: 'Adicionar',
  //         handler: data => {
  //           if (data.quarto == "") {
  //             this.AdicionarNumeroQuarto()
  //           }
  //           else {
  //             this.chamado.apartamento = data.quarto
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present()
  // }
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
    if (!this.editando)
      this.chamado.apartamento = this.selectUh
    // this.chamado.uhKey=this.selectUh.$key
    this.storage.get("usuario").then(res => {
      if (this.editando) {
        this.chamado.user = res.$key;
        this.chamado.status = 1;
        if (!this.chamado.tarefas)
          this.chamado.tarefas = [];
        let aux: any = {};
        let novas = [];
        this.servico.forEach(element => {
          if (element.ativo) {
            aux = {};
            aux.feito = false;
            aux.servicoId = element.$key;
            aux.titulo = element.titulo;
            novas.push(aux)
          }
        });
        novas.forEach(element => {
          let aux3 = this.chamado.tarefas.find(x => x.servicoId == element.servicoId)
          if (aux3 && aux3.feito) {
            this.chamado.status = 2;
            element.feito = true;
          }
        });
        this.chamado.tarefas = novas;
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
        this.chamado.status = 1;
        this.chamado.datacadastro = new Date()
        this.chamado.checkin = null
        this.chamado.checkout = null
        if (!this.chamado.tarefas)
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
