import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UhSelectPage } from './uh-select';

@NgModule({
  declarations: [
    UhSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(UhSelectPage),
  ],
})
export class UhSelectPageModule {}
