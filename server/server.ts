import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import {Logger} from './logger';
import {VcapServices} from './vcap-services';
import {ApiRouter} from './api.router';

const app: express.Application = express();
const appName = 'Analysis Microapp';
const logger: Logger = new Logger();
const vcapServices: VcapServices =  new VcapServices(process.env.VCAP_SERVICES, logger);
const port: any = process.env.PORT || 9042;

app.use(helmet());
app.use(compression());
app.use(morgan((tokens, req, res) => {
  return [
    `traceId: ${tokens.req(req, res, 'x-b3-traceid')} -`,
    `status: ${tokens.status(req, res)} -`,
    `method: ${tokens.method(req, res)} -`,
    `url: ${tokens.url(req, res)} -`,
    `responseTime: ${tokens['response-time'](req, res)}ms`
  ].join(' ');
}));

app.use(serveStatic(path.join(__dirname, '../apm-analysis-microapp-3')));

app.all('*', (req, res, next) => {
  // Set the cache-control header on the response for all
  // API calls.  The browser should not cache these calls.
  // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use('/api', new ApiRouter(vcapServices, logger).router);

// Listen
app.listen( port, () => {
  console.log(`${appName} started on ${port}`);
});
