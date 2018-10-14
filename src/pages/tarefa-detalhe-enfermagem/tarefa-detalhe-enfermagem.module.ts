import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaDetalheEnfermagemPage } from './tarefa-detalhe-enfermagem';

@NgModule({
  declarations: [
    TarefaDetalheEnfermagemPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaDetalheEnfermagemPage),
  ],
})
export class TarefaDetalheEnfermagemPageModule {}
