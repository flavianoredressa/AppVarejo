import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TarefaDetalheManutencaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefa-detalhe-manutencao',
  templateUrl: 'tarefa-detalhe-manutencao.html',
})
export class TarefaDetalheManutencaoPage {
  private width: any;
  public Tarefas: any;
  public Tarefa: any;
  public qtdTarefas = 0
  public taferasFeita = 0
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Tarefa = navParams.data
  }
  ionViewDidLoad() {
    this.width = 0
    this.Tarefas = [
      {
        nome: "Tarefa 1",
        quarto: 10,
        feito: false
      },
      {
        nome: "Tarefa 2",
        quarto: 11,
        feito: false
      },
      {
        nome: "Tarefa 3",
        quarto: 12,
        feito: false
      },
      {
        nome: "Tarefa 4",
        quarto: 13,
        feito: false
      },
      {
        nome: "Tarefa 5",
        quarto: 14,
        feito: false
      },
      {
        nome: "Tarefa 6",
        quarto: 15,
        feito: false
      }
    ]
    this.qtdTarefas = this.Tarefas.length
  }

  check(tarefa) {
    if (tarefa.feito == false) {
      this.width = this.width + (100 / this.Tarefas.length);
      this.taferasFeita++
    }
    else {
      this.width = this.width - (100 / this.Tarefas.length);
      this.taferasFeita--
      if (this.width < 0)
        this.width = 0;
    }
    tarefa.feito = !tarefa.feito;
  }

  verifcaTarefa() {
    if (this.taferasFeita > 0 && this.qtdTarefas == this.taferasFeita)
      return true
    else
      return false
  }
}
