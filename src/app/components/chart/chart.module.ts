import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartModule { }
