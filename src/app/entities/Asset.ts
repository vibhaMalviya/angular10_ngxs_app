export class Asset {
    uri: string;
    name: string;

    constructor(asset: Asset) {
        this.uri = asset.uri;
        this.name = asset.name;
    }
}
