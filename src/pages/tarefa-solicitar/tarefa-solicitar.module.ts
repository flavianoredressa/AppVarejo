import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaSolicitarPage } from './tarefa-solicitar';

@NgModule({
  declarations: [
    TarefaSolicitarPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaSolicitarPage),
  ],
})
export class TarefaSolicitarPageModule {}
