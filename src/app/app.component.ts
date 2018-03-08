import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              androidFullScreen: AndroidFullScreen,
              screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // detect orientation changes
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT).then(v => {
        console.log(v)
      }).catch(e => {
        console.warn(e)
      });
      androidFullScreen.isImmersiveModeSupported()
        .then(() => androidFullScreen.showSystemUI())
        .catch((error: any) => console.log(error));
    });
  }
}
