import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export abstract class BaseService {
    protected constructor(protected readonly http: HttpClient) {
        this.handleError = this.handleError.bind(this);
    }

    /**
     * Handle any errors in retrieving data from the server.
     */
    private handleError(error: HttpErrorResponse): Observable<any> {
        return throwError(`Error in api ${error.message}`);
    }

    /**
     * Generic get method
     */
    protected get(url: string): Observable<any> {
        return this.http
            .get(url)
            .pipe(catchError(this.handleError));
    }

    /**
     * Generic post method
     */
    protected post(url: string, body: any): Observable<any> {
        return this.http
            .post(url, body)
            .pipe(catchError(this.handleError));
    }
}
