import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaListaPage } from './tarefa-lista';

@NgModule({
  declarations: [
    TarefaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaListaPage),
  ],
})
export class TarefaListaPageModule {}
