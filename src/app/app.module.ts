import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AmplitudeTestModule } from './amplitude-test/amplitude-test.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { appReducer } from './state/state.reducer';
import { httpInterceptorProviders } from './interceptors';
// import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    EffectsModule.forRoot([]),
    StoreModule.forRoot({ app:appReducer}),

    DashboardModule,
    AmplitudeTestModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    /**
     * Interceptor 
     */
      // { provide: RequestCache, useClass: RequestCacheWithMap },

      httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
