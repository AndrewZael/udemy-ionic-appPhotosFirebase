import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'

import { MyApp } from './app.component'
//Pages
import { HomePage } from '../pages/home/home'
import { SubirPage } from '../pages/subir/subir'

//Pipes
import { PipesModule } from '../Pipes/pipes.module'

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//plugins
import { Camera } from '@ionic-native/camera'
import { ImagePicker } from '@ionic-native/image-picker';


import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

export const firebaseConfig = {
  apiKey: "AIzaSyC4ReSjk4jssMRlj43RuH03ok3uV0zv1Rw",
  authDomain: "gag-cd39b.firebaseapp.com",
  databaseURL: "https://gag-cd39b.firebaseio.com",
  storageBucket: "gag-cd39b.appspot.com",
  messagingSenderId: '459562654628'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}
