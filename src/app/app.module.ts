import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {CommonModule} from '@angular/common';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QRScanner} from '@ionic-native/qr-scanner';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {Toast} from '@ionic-native/toast';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {ImagePicker} from '@ionic-native/image-picker';
import { ImageResizer } from '@ionic-native/image-resizer';
import { Crop } from '@ionic-native/crop';
import {HttpClientModule} from '@angular/common/http';
import {RequestProvider} from '../providers/services/request.service'


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '返回',
      pageTransition: 'ios-transition'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    AndroidFullScreen,
    Toast,
    ScreenOrientation,
    ImagePicker,
    ImageResizer,
    Crop,
    RequestProvider
  ]
})
export class AppModule {
}

