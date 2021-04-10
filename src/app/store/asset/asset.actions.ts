import { Asset } from '../../entities/Asset';

export class SetPrimaryAsset {
  public static readonly type = '[Asset] SetPrimaryAsset';
  constructor(public asset: Asset){ }
}

export class GetRootInstances {
  public static readonly type = '[Asset] GetRootInstances';
}

export class GetAssetContext {
  public static readonly type = '[Asset] GetAssetContext';
  constructor(public assetId: string) { }
}
