import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';
import { OneSignal } from '@ionic-native/onesignal';
import { Camera } from '../../node_modules/@ionic-native/camera';
import { ImagePicker } from '../../node_modules/@ionic-native/image-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { OnesignalProvider } from '../providers/onesignal/onesignal';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing  } from "@ionic-native/social-sharing";
import { AppVersion } from '@ionic-native/app-version';
import { CameraProvider } from '../providers/camera/camera';
import { HelperProvider } from '../providers/helper/helper';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import * as firebase from 'firebase';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AvaliacoesPage } from '../pages/avaliacoes/avaliacoes';
import { TarefaListaPage } from '../pages/tarefa-lista/tarefa-lista';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MascaraProvider } from '../providers/mascara/mascara';
import { ToastProvider } from '../providers/toast/toast';
// CONFIGURAÇÃO FIREBASE 

  var config = {
    apiKey: "AIzaSyAQnKzl3CJP6ZCtsXzk8KqZgvnjXu-E9CI",
    authDomain: "hackathonvarejo.firebaseapp.com",
    databaseURL: "https://hackathonvarejo.firebaseio.com",
    projectId: "hackathonvarejo",
    storageBucket: "hackathonvarejo.appspot.com",
    messagingSenderId: "793313377241"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings( { timestampsInSnapshots: true })

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AvaliacoesPage,
    TarefaListaPage,
    TabsPage
  ],
  imports: [
    IonicImageViewerModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp, {
      navExitApp: false, 
      backButtonText: '',
      tabsHideOnSubPages: true,
      monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',],
      monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: ['Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta', 'Sabado',],
      dayShortNames: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB',],
    }),
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      space:-3,
      radius:18,
      outerStrokeWidth:3,
      innerStrokeWidth:3,
      backgroundOpacity: 1,
      animationDuration:300,
      backgroundColor: "transparent",
      backgroundStroke: "transparent",
      outerStrokeColor: "#4882c2",
      innerStrokeColor: "#e7e8ea",
      titleColor: "#444444",
      unitsColor: "#444444",
      subtitleColor: "#A9A9A9",
      showSubtitle:false,
      clockwise:true,
      animation:true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AvaliacoesPage,
    TarefaListaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Camera,
    ImagePicker,
    SocialSharing,
    Geolocation,
    LaunchNavigator,
    AppVersion,
    AngularFireStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    OnesignalProvider,
    CameraProvider,
    HelperProvider,
    FirebaseProvider,
    MascaraProvider,
    ToastProvider
  ]
})
export class AppModule { }
