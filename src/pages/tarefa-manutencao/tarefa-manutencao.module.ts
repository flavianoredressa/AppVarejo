import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaManutencaoPage } from './tarefa-manutencao';

@NgModule({
  declarations: [
    TarefaManutencaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaManutencaoPage),
  ],
})
export class TarefaManutencaoPageModule {}
