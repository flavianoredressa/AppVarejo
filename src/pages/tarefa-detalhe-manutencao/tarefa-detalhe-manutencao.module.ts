import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaDetalheManutencaoPage } from './tarefa-detalhe-manutencao';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    TarefaDetalheManutencaoPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(TarefaDetalheManutencaoPage),
  ],
})
export class TarefaDetalheManutencaoPageModule {}
 