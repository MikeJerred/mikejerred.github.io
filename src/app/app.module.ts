import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import * as Hammer from 'hammerjs';

import { SharedModule } from '~/shared/shared.module';
import { AppRouteReuseStrategy } from './app-route-reuse-strategy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { PageNotFoundComponent } from './page-not-found.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
    override overrides = {
        swipe: { direction: Hammer.DIRECTION_ALL }
    };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,

    SharedModule,
    AppRoutingModule
  ],
  providers: [
    Title,
    { provide: 'Window', useValue: window },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy }
  ],
  declarations: [
    AppComponent,
    IntroComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
