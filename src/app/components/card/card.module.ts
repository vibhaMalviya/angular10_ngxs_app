import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {ChartModule} from '../chart/chart.module';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { DxSortableModule } from 'devextreme-angular/ui/sortable';

@NgModule({
  declarations: [CardComponent],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    DxDropDownButtonModule,
    DxSortableModule
  ]
})
export class CardModule { }
