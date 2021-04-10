import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViewproxyService extends BaseService {
    private readonly baseUrl = 'api/view-proxy/v1/decks/';
    private readonly sourceTenant_RC = '7d1a5025-4d73-48a9-a40c-c093cff82e3c';
    private readonly user_RC = '6e729d26-82d3-4a9c-a444-96947e232436';
    private readonly sourceTenant_QA = '2bcdb0d5-e95e-4fe5-b97a-1d979abca5d9';
    private readonly user_QA_smokeuser = '6b82aa4f-f075-4d4e-b3e5-9888b5676b27';
    private readonly user_QA_v3_test = '4e96ce38-b07d-4a4e-ae38-d5fd670f4965';
    constructor(http: HttpClient) {
        super(http);
    }

    getAllTemplates(): Observable<any> {
        return this.post(`${this.baseUrl}templates`, {
            scope: 'All',
            enterprise: ['AVD-CHART-ENTERPRISE-ID'],
            order: 'asc',
            source: 'analysis',
            sourceTenant: this.sourceTenant_QA,
            user: this.user_QA_v3_test
        });
    }

    getTemplate(templateId): Observable<any> {
      return this.get(`${this.baseUrl}template/${templateId}?sourceTenant=${this.sourceTenant_QA}`);
    }

}
