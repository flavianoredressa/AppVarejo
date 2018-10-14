import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { AvaliacoesPage } from '../avaliacoes/avaliacoes';
import { TarefaListaPage } from '../tarefa-lista/tarefa-lista';
import { AvaliarPage } from '../avaliar/avaliar';
import { Storage } from '@ionic/storage';
import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  
  tabs = [
    { title: "Tarefas", root: TarefaListaPage, icon: "ios-list-outline", ativo: true },
    { title: "Dash", root: HomePage, icon: "ios-pie-outline", ativo: true },
    { title: "Avaliações", root: AvaliacoesPage, icon: "ios-star-outline", ativo: true },
    { title: "Avaliar", root: "AvaliarPage", icon: "ios-star-outline", ativo: true },
    { title: "Mapa", root: "MapaPage", icon: "ios-map", ativo: false },
    { title: "Perfil", root: "PerfilPage", icon: "ios-person", ativo: true },
  ];
  private usuario = {};
  constructor(private storage: Storage) {
    this.usuario["tipo"] = 1;
  }
  ionViewDidLoad() {
    this.storage.get("usuario").then(res => {
      this.usuario = res;
      switch (res.tipo) {
        case 1:
          this.tabs[3].ativo = false;
          break;
          case 3://cliente
          this.tabs[0].ativo = false;
          this.tabs[1].ativo = false;
          this.tabs[2].ativo = false;
          this.tabs[4].ativo = true;
          this.tabRef.select(3);
          break;
        case 4:
          this.tabs[1].ativo = false;
          this.tabs[3].ativo = false;
          break;

        default:
          break;
      }

    })
  }


}
