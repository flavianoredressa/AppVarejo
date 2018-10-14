import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaCamareiraPage } from './tarefa-camareira';

@NgModule({
  declarations: [
    TarefaCamareiraPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaCamareiraPage),
  ],
})
export class TarefaCamareiraPageModule {}
