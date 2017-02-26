import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LifeCarePage } from '../pages/life-care/life-care';
import { SobrePage } from '../pages/sobre/sobre';

@NgModule({
  declarations: [
    MyApp,
    LifeCarePage,
    SobrePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LifeCarePage,
    SobrePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
