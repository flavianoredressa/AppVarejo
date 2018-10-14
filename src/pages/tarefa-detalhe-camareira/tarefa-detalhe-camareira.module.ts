import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaDetalheCamareiraPage } from './tarefa-detalhe-camareira';

@NgModule({
  declarations: [
    TarefaDetalheCamareiraPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaDetalheCamareiraPage),
  ],
})
export class TarefaDetalheCamareiraPageModule {}
