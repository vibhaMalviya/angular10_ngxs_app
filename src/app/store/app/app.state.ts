import { State, Action, StateContext, Store } from '@ngxs/store';
import {AppStateModel} from './app-state.model';
import { GetAllTemplates, SetAnalysisContext } from '../app/app.actions';
import produce from 'immer';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetTemplate, LoadDefaultView } from '../view/view.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ViewproxyService } from '../../services/viewproxy.service';
import { Injectable } from '@angular/core';
import { ViewService } from '../../services/view.service';

@State<AppStateModel>({
  name: 'appState',
  defaults: AppStateModel.default()
})

@Injectable()
export class AppState {

  constructor(private readonly viewProxyService: ViewproxyService, private readonly store: Store,
              private readonly viewService: ViewService){ }

  @Action(SetAnalysisContext)
  public setAnalysisContext(ctx: StateContext<AppStateModel>, payload: SetAnalysisContext) {
    ctx.setState(
      produce((draft: AppStateModel) => {
        draft.viewId = payload.viewId ?  payload.viewId : null;
        draft.assetId = payload.assetId ? payload.assetId : null;
        draft.context = payload.context ? payload.context : null;
      })
    );
    this.loadView(ctx);
  }

  @Action(GetAllTemplates)
  public getAllTemplates(ctx: StateContext<AppStateModel>): Observable<any> {
    return this.viewProxyService.getAllTemplates().pipe(
      tap((templateList: any) => {
          ctx.setState(
            produce((draft: AppStateModel) => {
              draft.templates = templateList;
            })
          );
        },
        error => {
          console.log(` Error getting templates list ${error}`);
        }));
  }

  public loadView(ctx) {
    const state = ctx.getState();
    if (state.context && state.viewId && state.viewId !== 'default') {
      console.log('Template Loading');
      this.getTemplate(state.viewId);
    } else {
      console.log('Default View Loading');
      this.loadDefaultView(state.context, state.viewId);
    }
  }

  @Dispatch() getTemplate = (templateId) => new GetTemplate(templateId);
  @Dispatch() loadDefaultView = (context, viewId) => new LoadDefaultView(context, viewId);
}
