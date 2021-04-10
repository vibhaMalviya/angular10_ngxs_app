import {Injectable} from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SetPrimaryAsset } from '../store/asset/asset.actions';
import { Asset } from '../entities/Asset';
import { DataCard } from '../entities/DataCard';
import { AddCard } from '../store/view/view.actions';


@Injectable({
    providedIn: 'root'
})
export class ViewService {
    constructor() {
    }

    processTemplate(view: any) {
        console.log('new state %o', view);
        if (view && view.cards) {
            const asset = new Asset(view.cards[0].attributes.metaCard.assets[0]);
            this.setPrimaryAsset(asset);
            const card = new DataCard(view.cards[0].attributes.dataCards[0]);
            this.addCard(card);
        }
    }

    loadDefaultView(context: string, view: string) {
        const card = new DataCard();
        this.addCard(card);
    }

    @Dispatch() setPrimaryAsset = (asset: Asset) => new SetPrimaryAsset(asset);
    @Dispatch() addCard = (card: DataCard) => new AddCard(card);
}
