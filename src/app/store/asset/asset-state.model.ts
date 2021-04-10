import {Asset} from '../../entities/Asset';

export class AssetStateModel {
    primaryAsset: Asset;
    assets: Map<string, Asset>;
    assetIds: Array<string>;
    assetTags: Map<string, Array<any>>;
    rootInstances: any[];

    static default(): AssetStateModel {
        return {
            primaryAsset: null,
            assets: null,
            assetIds: [],
            assetTags: null,
            rootInstances: null
        };
    }
}
