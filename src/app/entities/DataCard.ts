import {AnalysisChart} from './AnalysisChart';
import { v4 as uuidV4 } from 'uuid';

export class DataCard {
    id: string;
    title: string;
    type: string;
    charts: Array<AnalysisChart>;

    constructor(card?) {
      this.type = card ? card.type : 'default';
      this.id = card ? card.id : new uuidV4();
      this.title = card ? card.title : 'Card1';
      this.charts = card ? card.charts : [new AnalysisChart()];
    }
}
