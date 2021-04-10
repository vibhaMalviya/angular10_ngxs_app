import {Router, Request, Response} from 'express';
import * as Proxy from 'express-request-proxy';
import {VcapServices} from './vcap-services';
import {Logger} from './logger';

const DEFAULT_TIMEOUT = 10000;

export class ApiRouter {
    protected readonly _router;

    get router(): Router {
        return this._router;
    }

    constructor(
        protected readonly vcapServices: VcapServices,
        protected readonly logger: Logger) {
        this._router = Router();
        this.logger = logger;
        this.addRoutes();
        this.logger.info(`done adding routes`);
    }

    addRoutes(): void {
        this._router.use('/asset/*', this.proxyAssetRequest.bind(this));
        this._router.use('/time-series/*', this.proxyTimeseriesRequest.bind(this));
        this._router.use('/view-proxy/*', this.proxyTemplateRequest.bind(this));
    }

    proxyAssetRequest(req: Request, res: Response, next): void {
        this.logger.info(`proxying to ${this.vcapServices.getApplicationUri('avid-apm-asset')}`);
        Proxy({
            url: `${this.vcapServices.getApplicationUri('avid-apm-asset')}/*`,
            timeout: this.getTimeout(req)
        })(req, res, next);
    }

    proxyTimeseriesRequest(req: Request, res: Response, next): void {
        this.logger.info(`proxying to ${this.vcapServices.getApplicationUri('avid-apm-timeseries-services')}`);
        Proxy({
            url: `${this.vcapServices.getApplicationUri('avid-apm-timeseries-services')}/*`,
            timeout: this.getTimeout(req)
        })(req, res, next);
    }

    proxyTemplateRequest(req: Request, res: Response, next): void {
        this.logger.info(`proxying to ${this.vcapServices.getApplicationUri('apm-view-proxy')}`);
        Proxy({
            url: `${this.vcapServices.getApplicationUri('apm-view-proxy')}/*`,
            timeout: this.getTimeout(req)
        })(req, res, next);
    }

    getTimeout(req): number {
        try {
            return parseInt(req.headers.timeout, 10) || DEFAULT_TIMEOUT;
        } catch (err) {
            return DEFAULT_TIMEOUT;
        }
    }
}
