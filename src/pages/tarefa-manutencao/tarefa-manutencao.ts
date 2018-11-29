import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, AlertController, LoadingController, ActionSheetController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToastProvider } from '../../providers/toast/toast';
import { CameraProvider } from '../../providers/camera/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { Tarefa } from '../../models/Tarefa';

@IonicPage()
@Component({
  selector: 'page-tarefa-manutencao',
  templateUrl: 'tarefa-manutencao.html',
})
export class TarefaManutencaoPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('fileInput') fileInput;

  chamado: any = {};
  servico: any = [];
  imagens = [];
  editando = false;
  tarefa: Array<Tarefa>
  tipo = "eletrica";
  galleryApp = [];
  protected vilas = [];
  protected vila;
  protected uhs = [];
  protected uhsALL = [];
  protected selectUh

  constructor(
    private Dom: DomSanitizer,
    public navCtrl: NavController,
    public view: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public _toast: ToastProvider,
    public _camera: CameraProvider,
    public _firebase: FirebaseProvider,
    public navParams: NavParams) {
    if (this.navParams.data != null && this.navParams.data.tarefas) {
      this.chamado = this.navParams.data;
      this.editando = true;
      this.imagens = this.chamado.imagens;
    }
    else {
      this.chamado.urgente = false;
      this.imagens = [];
    }
  }
  ionViewDidLoad() {
    let load = this.loadingCtrl.create({
      content: "Buscando",
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
    this._firebase.getServico(5).subscribe((res: any) => {
      this.servico = res;
      if (this.editando)
        this.chamado.tarefas.forEach(element => {
          let aux = this.servico.find(x => x.$key == element.servicoId)
          if (aux) {
            aux.ativo = true;
            aux.feito = aux.feito;
          }
        });
      load.dismiss();
    })
    if (!this.editando)
     // this.AdicionarNumeroQuarto()
    this.slides.lockSwipes(true)
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
  AdicionarNumeroQuarto() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      message: "Informe o numero do quarto!",
      enableBackdropDismiss: false,
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
    let all = [];
    this.imagens.forEach(element => {
      if (element.length > 200)
        all.push(this.updateImagem(element))
    });
    Promise.all(all).then(res => {
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
          this.chamado.imagens = res;
          this.chamado.tipo = 5;
          this.chamado.status = "1"
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

          this.chamado.user = res.$key;
          this._firebase.save("chamado", this.chamado).then(res => {
            this.view.dismiss()
            load.dismiss();
          })
        }
      })
    })
  }
  verifica() {
    let r = false;
    switch (this.slides._activeIndex) {
      case 0:
        r = (this.servico.length > 0 && this.servico.find(x => x.ativo) != null) || (this.chamado.outra && this.chamado.outra != '')
        break;
      default:
        r = true
        break;
    }
    return r;
  }
  deleteImagem(item) {
    {
      let alert = this.alertCtrl.create({
        message: 'Deseja excluir a imagem ?',
        buttons: [{ text: 'Não', },
        { text: 'Sim', handler: () => { this.imagens.splice(this.chamado.imagens.indexOf(item), 1); } }
        ]
      });
      alert.present();
    }
  }
  getImage() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione',
      buttons: [
        {
          text: 'Camera', handler: () => {
            this._camera.getPicture('Camera', 400).then((res: any) => {
              this.imagens.push(res)
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        {
          text: 'Galeria', handler: () => {
            this._camera.getPicture('FotoPerfil', 400).then((res: any) => {
              this.imagens.push(res)
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        { text: 'Cancelar', role: 'cancel', handler: () => { } }
      ]
    });
    actionSheet.present();
  }
  updateImagem(imagem) {
    return new Promise<any>((resolve, reject) => {
      let date = new Date();
      let month = date.getMonth() + 1;
      let idGenerator = date.getDate().toString() + month.toString() + date.getFullYear().toString() + date.getHours().toString()
        + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();

      this._camera.uploadPhoto(imagem, idGenerator, "manutencao/")
        .then((savedPicture) => {
          imagem = savedPicture;
          resolve(savedPicture)
        }).catch((error) => {
          console.log(error)
          reject()
        })
    })
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      // this.updateImagem(imageData).then(res=>{})
      this.imagens.push(imageData)
    };
    if (event.target.files.length > 0)
      reader.readAsDataURL(event.target.files[0]);
  }
  ativos(tipo) {
    return this.servico.find(x => x.ativo && x.tipoServico == tipo)
  }
}
