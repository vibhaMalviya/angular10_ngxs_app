import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Asset} from '../../entities/Asset';
import {GetAssetContext, GetRootInstances} from '../../store/asset/asset.actions';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'deck-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Select(state => state.assetState.primaryAsset) primaryAsset$: Observable<Asset>;
  @ViewSelectSnapshot(state => state.viewState.viewName) viewName: string;

  constructor() {
  }

  initializeAssetContext(): void {

    // this.getRootInstances();
    // this.getAssetContext(assetId);
  }

  @Dispatch() getAssetContext = (assetId) => new GetAssetContext(assetId);
  @Dispatch() getRootInstances = () => new GetRootInstances();
}
