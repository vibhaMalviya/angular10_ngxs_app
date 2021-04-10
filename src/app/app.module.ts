import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppState} from './store/app/app.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgxsModule.forRoot([]),
        NgxsSelectSnapshotModule.forRoot(),
        NgxsDispatchPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        NgxsResetPluginModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
