import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetService extends BaseService {
    private readonly baseUrl = 'api/asset/v3';
    constructor(http: HttpClient) {
        super(http);
    }

    getRootInstances(): Observable<any> {
        return this.get(`${this.baseUrl}/root-instances`);
    }

    getAssetContext(assetId: string): Observable<any> {
        return this.get(`${this.baseUrl}${assetId}?components=PARENT,ATTRIBUTES,TYPE`);
    }

}
