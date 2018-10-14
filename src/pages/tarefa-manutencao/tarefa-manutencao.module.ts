import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaManutencaoPage } from './tarefa-manutencao';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    TarefaManutencaoPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(TarefaManutencaoPage),
  ],
})
export class TarefaManutencaoPageModule {}
