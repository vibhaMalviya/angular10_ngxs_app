import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AddCard,
  AddChart,
  GetTemplate,
  LoadDefaultView,
  ReorderPlottedCharts
} from './view.actions';
import { ViewStateModel } from './view-state.model';
import { ViewproxyService} from '../../services/viewproxy.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import produce from 'immer';
import { Injectable } from '@angular/core';
import { ViewService } from '../../services/view.service';

@State<ViewStateModel>({
  name: 'viewState',
  defaults: ViewStateModel.default()
})

@Injectable()
export class ViewState {
  constructor(private readonly viewProxyService: ViewproxyService, private readonly viewService: ViewService){
  }

  @Selector()
  public static getCard(state: ViewStateModel, cardId: string) {
    return state.cards.get(cardId);
  }

  @Action(AddCard)
  public addCard(ctx: StateContext<ViewStateModel>, payload: AddCard) {
    ctx.setState(
      produce((draft: ViewStateModel) => {
        const cardId = payload.card.id;
        const cards = new Map();
        cards.set(cardId, payload.card);
        draft.cards = cards;
        draft.cardIds = [cardId];
        draft.currentCardId = draft.cardIds[0];
      })
    );
  }

  @Action(AddChart)
  public addChart(ctx: StateContext<ViewStateModel>, payload: AddChart) {
    ctx.setState(
      produce((draft: ViewStateModel) => {
        draft.cards.get(draft.currentCardId).charts.push(payload.chart);
      })
    );
  }

  @Action(ReorderPlottedCharts)
  public ReorderPlottedCharts(ctx: StateContext<ViewStateModel>, payload: ReorderPlottedCharts) {
    ctx.setState(
      produce((draft: ViewStateModel) => {
        const droopedChart = draft.cards.get(draft.currentCardId).charts.splice(payload.fromIndex, 1)[0];
        draft.cards.get(draft.currentCardId).charts.splice(payload.toIndex, 0, droopedChart);
      })
    );
  }

  @Action(GetTemplate)
  public getTemplate(ctx: StateContext<ViewStateModel>, payload: GetTemplate): Observable<any> {
    return this.viewProxyService.getTemplate(payload.viewId).pipe(
      tap((template: any) => {
        ctx.setState(
          produce((draft: ViewStateModel) => {
            draft.viewName = template.title;
          })
        );
        this.viewService.processTemplate(template);
        },
        error => {
          console.log(` Error getting template ${payload.viewId} ${error}`);
        }));
  }

  @Action(LoadDefaultView)
  public loadDefaultView(ctx: StateContext<ViewStateModel>, payload: LoadDefaultView) {
    ctx.setState(
      produce((draft: ViewStateModel) => {
        draft.viewName = payload.viewId;
      })
    );
    this.viewService.loadDefaultView(payload.context, payload.viewId);
  }
}
