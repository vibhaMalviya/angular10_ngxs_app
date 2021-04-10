import {AnalysisTag} from './AnalysisTag';
import { v4 as uuidV4 } from 'uuid';

export class AnalysisChart {
    id: string;
    title: string;
    tags: Array<AnalysisTag>;
    type: string;

    constructor(chart?: any) {
        this.id = chart.id ? chart.id : new uuidV4();
        this.type = chart.type ? chart.type : 'Timeseries Chart';
        this.tags = chart.tags ? chart.tags : [];
        this.title = chart.title ? chart.title : 'New Chart';
    }
}
