import { NgModule, AfterViewInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import {
  DxTreeViewModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxDraggableModule,
  DxSortableModule
} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [SidePanelComponent],
    exports: [
        SidePanelComponent
    ],
  imports: [
    CommonModule,
    DxTreeViewModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxDraggableModule,
    FormsModule,
    DxSortableModule
  ]
})
export class SidePanelModule {}
