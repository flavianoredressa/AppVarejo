import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaListaConcluidaPage } from './tarefa-lista-concluida';

@NgModule({
  declarations: [
    TarefaListaConcluidaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaListaConcluidaPage),
  ],
})
export class TarefaListaConcluidaPageModule {}
