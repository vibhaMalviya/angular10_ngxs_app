import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimeseriesService extends BaseService {
    private readonly baseUrl = 'api/time-series/v5/time_series/query';
    constructor(http: HttpClient) {
        super(http);
    }

    getTimeseriesData(tags): Observable<any> {
        return this.post(this.baseUrl, {
            tagList: tags,
            operation: 'interpolated',
            sampleCount: 1000,
            startTime: '2016-11-25T02:10:34.000Z',
            endTime: '2017-12-10T02:10:34.000Z',
            responseFormat: 'KairosDB',
            useOnlyNumericData: false
        });
    }

}
