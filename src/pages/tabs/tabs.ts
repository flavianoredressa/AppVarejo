import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AvaliacoesPage } from '../avaliacoes/avaliacoes';
import { TarefaListaPage } from '../tarefa-lista/tarefa-lista';
import { AvaliarPage } from '../avaliar/avaliar';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabs = [
    { title: "Tarefas", root: TarefaListaPage, icon: "ios-list-outline", ativo: true },
    { title: "Avaliações", root: AvaliacoesPage, icon: "ios-star-outline", ativo: true },
    { title: "Avaliar", root: "TarefaDetalheManutencaoPage", icon: "ios-star-outline", ativo: true },
    { title: "Dash", root: HomePage, icon: "ios-pie-outline", ativo: true },
  ];
  // tab1Root = HomePage;
  // tab2Root = TarefaListaPage;
  // tab3Root = AvaliacoesPage;
  // tab4Root = "TarefaDetalheManutencaoPage";
  private usuario = {};
  constructor(
    private storage: Storage,
  ) {
    this.usuario["tipo"] = 1;

  }
  ionViewDidLoad() {
    this.storage.get("usuario").then(res => {
      this.usuario = res;
      if (res.tipo == 4) {
        this.tabs[1].ativo = false;
        this.tabs[3].ativo = false;
      }
    })
  }


}
