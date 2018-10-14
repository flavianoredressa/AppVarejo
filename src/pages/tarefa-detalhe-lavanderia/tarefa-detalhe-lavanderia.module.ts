import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaDetalheLavanderiaPage } from './tarefa-detalhe-lavanderia';

@NgModule({
  declarations: [
    TarefaDetalheLavanderiaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaDetalheLavanderiaPage),
  ],
})
export class TarefaDetalheLavanderiaPageModule {}
