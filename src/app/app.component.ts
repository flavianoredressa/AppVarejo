import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = TabsPage;
  rootPage:any = "LoginPage";
  constructor(
    private platform: Platform,
    private storage: Storage,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#EA7533');
      statusBar.styleDefault();
      splashScreen.hide();
      storage.get("usuario").then(res => {
        if (res != null) {
          this.rootPage = TabsPage;
        }
      })
    });
  }
}
