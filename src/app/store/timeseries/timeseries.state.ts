import { State, Action, StateContext } from '@ngxs/store';
import { GetTimeseriesData } from './timeseries.actions';
import {TimeseriesStateModel} from './timeseries-state.model';
import produce from 'immer';
import { TimeseriesService } from '../../services/timeseries.service';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@State<TimeseriesStateModel>({
  name: 'timeseriesState',
  defaults: TimeseriesStateModel.default()
})
@Injectable()
export class TimeseriesState {

  constructor( private readonly timeseriesService: TimeseriesService) {
  }

  @Action(GetTimeseriesData)
  getTimeseriesData(ctx: StateContext<TimeseriesStateModel>, payload: GetTimeseriesData): Observable<any> {
    console.log(`timeseries response for ${payload}`);
    return this.timeseriesService.getTimeseriesData(payload.tags).pipe(
      tap((data) => {
      console.log(`timeseries response for ${payload.tags} is ${data}`);
      ctx.setState(
        produce((draft: TimeseriesStateModel) => {
          const tsData = data && data.queries && data.queries.length ? data.queries[0].results[0] : {};
          draft.chartData.set(payload.chartId, tsData);
        })
      );
    }, (error) => {
        console.log(`Error in timeseries ${error}`);
      }));
  }
}
