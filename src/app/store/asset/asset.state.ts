import { State, Action, Selector, StateContext } from '@ngxs/store';
import { AssetStateModel } from './asset-state.model';
import { Injectable } from '@angular/core';
import {
  GetAssetContext,
  GetRootInstances, SetPrimaryAsset
} from './asset.actions';
import { AssetService } from '../../services/asset.service';
import produce from 'immer';
import { Asset } from '../../entities/Asset';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@State<AssetStateModel>({
  name: 'assetState',
  defaults: AssetStateModel.default()
})
@Injectable()
export class AssetState {
  constructor(private readonly assetService: AssetService) {
  }

  @Action(SetPrimaryAsset)
  setAsset(ctx: StateContext<AssetStateModel>, payload: any) {
    ctx.setState(
      produce((draft: AssetStateModel) => {
        draft.primaryAsset = payload.asset;
        if (draft.assetIds) {
          draft.assetIds.push(payload.asset.uri);
        } else {
          draft.assetIds = [payload.asset.uri];
        }
      })
    );
  }

  @Action(GetAssetContext)
  getAssetContext(ctx: StateContext<AssetStateModel>, payload: GetAssetContext) {
    return this.assetService.getAssetContext(payload.assetId).pipe(
      tap((asset: Asset) => {
        ctx.setState(
          produce((draft: AssetStateModel) => {
            if (draft.assets) {
              draft.assets.set(payload.assetId, asset);
            } else {
              draft.assets = new Map<string, Asset>();
              draft.assets.set(payload.assetId, asset);
            }
          })
        );
      },
      error => {
      console.log(` Error getting assetContext ${error}`);
    }));
  }

  @Action(GetRootInstances)
  getRootInstances(ctx: StateContext<AssetStateModel>): Observable<any> {
    return this.assetService.getRootInstances().pipe(
      tap((data) => {
      ctx.setState(
        produce((draft: AssetStateModel) => {
          draft.rootInstances = data;
        })
      );
    }));
  }
}
