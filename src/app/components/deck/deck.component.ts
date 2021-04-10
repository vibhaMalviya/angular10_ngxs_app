import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetAnalysisContext } from '../../store/app/app.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { StateReset } from 'ngxs-reset-plugin';
import { ViewState } from '../../store/view/view.state';
import { Store } from '@ngxs/store';
import { AssetState } from '../../store/asset/asset.state';

@Component({
  selector: 'analysis-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {
  }

  ngOnInit(): void {
    // TODO: Have different routes
    // read into different route parameters such as adhoc, AVT-template, AVT-default, AVT-ss
    // dispatch action to set state with route parameters.
    // call template service which will create new view object and set different states by dispatching actions
    // different state will listen to actions and update data and refresh view.
    const viewId = this.route.snapshot.paramMap.get('templateId');
    this.store.dispatch(
      new StateReset(ViewState, AssetState)
    ).subscribe(() => {
      this.setAnalysisContext('adhoc', viewId);
    });
  }

  @Dispatch() setAnalysisContext = (context, viewId) => new SetAnalysisContext(context, viewId);
}
