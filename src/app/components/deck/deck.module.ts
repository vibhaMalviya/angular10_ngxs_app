import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck.component';
import { DeckRoutingModule } from './deck-routing.module';
import {CardModule} from '../card/card.module';
import {HeaderModule} from '../header/header.module';
import {SidePanelModule} from '../side-panel/side-panel.module';
import { NgxsModule } from '@ngxs/store';
import { AssetState } from '../../store/asset/asset.state';
import { TimeseriesState } from '../../store/timeseries/timeseries.state';
import { ViewState } from '../../store/view/view.state';
import { AppState } from '../../store/app/app.state';


@NgModule({
  declarations: [DeckComponent],
  imports: [
    NgxsModule.forFeature([AppState, AssetState, ViewState, TimeseriesState]),
    CommonModule,
    DeckRoutingModule,
    CardModule,
    HeaderModule,
    SidePanelModule
  ]
})
export class DeckModule { }
