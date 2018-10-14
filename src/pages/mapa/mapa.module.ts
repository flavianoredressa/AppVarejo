import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(MapaPage),
  ],
})
export class MapaPageModule {}
