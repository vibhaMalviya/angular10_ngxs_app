import { Template } from '../../entities/Template';

export class AppStateModel {

    viewId: string;
    context: string;
    assetId: string;
    templates: Array<Template>;

    static default(): AppStateModel {
        return {
            viewId: null,
            context: null,
            assetId: null,
            templates: []
        };
    }
}
