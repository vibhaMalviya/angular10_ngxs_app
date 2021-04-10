import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateBrowserComponent } from './template-browser.component';
import { TemplateBrowserRoutingModule } from './template-browser-routing.module';
import { NgxsModule } from '@ngxs/store';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { AppState } from '../../store/app/app.state';

@NgModule({
  declarations: [TemplateBrowserComponent],
  imports: [
    NgxsModule.forFeature([AppState]),
    CommonModule,
    TemplateBrowserRoutingModule,
    DxDataGridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemplateBrowserModule {}
