import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaDetalheManutencaoPage } from './tarefa-detalhe-manutencao';

@NgModule({
  declarations: [
    TarefaDetalheManutencaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaDetalheManutencaoPage),
  ],
})
export class TarefaDetalheManutencaoPageModule {}
