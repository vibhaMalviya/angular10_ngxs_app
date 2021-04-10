/**
 * Simple TypeScript Common Logging Format utility for NodeJS
 * Based on the example at: https://devcloud.swcoe.ge.com/devspace/x/U1exSQ
 *
 * USAGE
 *  1. Initialize with VCAP application:
 *           const logger: Logger = new Logger();
 *           const vcapApplication: VcapApplication =  new VcapApplication(process.env.VCAP_APPLICATION);
 *           logger.init(vcapApplication);
 *  2. Initialize as middleware at app startup:
 *           this.app.use((req, res, next) => { this._logger.setContext(req, res, next); });
 *  3. Use various logging methods as desired, in place of console logging.
 *
 * INITIALIZATION
 * There is some one-time initialization to set the applicationId, applicationName and instanceId. These are all
 * avaliable in process.env.VCAP_APPLICATION, or you can define some convenience methods in your vcapServices
 * file like so:
 *
 *     const logger = require('./logger').logger;
 *     logger.init(vcapServices.getApplicationId(), vcapServices.getApplicationName(), vcapServices.getInstanceIndex());
 *
 * LOGGING
 * After that, all logging statements are very simple:
 *     logger.info('some logging message');
 *
 * sample log entry:
 * {"time":"2018-03-07T21:13:50.849","tnt":"2bcdb0d5-e95e-4fe5-b97a-1d979abca5d9","corr":"a07c9244b37b1961",
 * "appn":"apm-analysis-data-svc-local","dpmt":"bbb60ff8-615b-4a02-8ecf-b3e89906b9ed","inst":"na","lvl":"INFO",
 * "msg":"prefetch/alarm - alarmId=A7406BB24A504E6EA728B17EA08D04EE"}
 *
 */

export class Logger {

  constructor() {
  }
  private static readonly NOT_AVAILABLE: string = 'na';
  private static readonly LEVEL_INFO: string = 'INFO';
  private static readonly LEVEL_DEBUG: string = 'DEBUG';
  private static readonly LEVEL_WARN: string = 'WARN';
  private static readonly LEVEL_ERROR: string = 'ERROR';

  public static readonly HEADERS: any = {
    xB3TraceId: 'x-b3-traceid',
    xB3SpanId: 'x-b3-spanid',
    xB3ParentSpanId: 'x-b3-parentspanid'
  };

  private context: any = {};

  private deploymentId: string = Logger.NOT_AVAILABLE;
  private applicationName: string = Logger.NOT_AVAILABLE;
  private instanceIndex: string = null;

  private static _isDefined(value: any): boolean {
    return (typeof value !== 'undefined') && value !== null;
  }

  private static _fallback(value: any, fallback: any): any {
    return Logger._isDefined(value) ? value : fallback;
  }

  private static _header(req: any, header: string): string {
    return req && req.headers ? (req.get(header) || Logger.NOT_AVAILABLE) : Logger.NOT_AVAILABLE;
  }

  /**
   * set the context for a single request
   * @param req - HTTP request obj
   * @param res - HTTP response object
   * @param next - next middleware to call
   */
  public setContext(req: any, res: any, next: any): void {
    try {

      this.context = {};

      // Setup the context of the current call based on VCAP values as well as current request headers
      this.context.time = new Date().toISOString().split('Z')[0];
      this.context.tnt = Logger._header(req, 'tenant');
      this.context.corr = Logger._header(req, Logger.HEADERS.xB3TraceId);
      this.context.span = Logger._header(req, Logger.HEADERS.xB3SpanId);
      this.context.prnt = Logger._header(req, Logger.HEADERS.xB3ParentSpanId);
      this.context.appn = this.applicationName;
      this.context.dpmt = this.deploymentId;
      this.context.dpmt = this.deploymentId;
      this.context.inst = this.instanceIndex;

      // If there is a response object to populate, fill in the trace IDs from the request.
      if (res) {
        res.set(Logger.HEADERS.xB3TraceId, req.get(Logger.HEADERS.xB3TraceId));
        res.set(Logger.HEADERS.xB3SpanId, req.get(Logger.HEADERS.xB3SpanId));
        res.set(Logger.HEADERS.xB3ParentSpanId, req.get(Logger.HEADERS.xB3ParentSpanId));
      }
    } catch (ex) {
      console.error('Error setting context.');
    }

    // Invoke the next middleware
    next();

    // Clear the context so it starts with a clean slate next time
    this.context = {};
  }

  /**
   * General helper to log an entry at the specified log level
   * @param level - logging level
   * @param message - message to log
   * @param error - optional error to be logged
   */
  private _write(level: string, message?: any, error?: any): void {
    const log: any = {};
    for (const key of Object.keys(this.context)) {
      log[key] = this.context[key];
    }

    if (level) { log.lvl = level; }

    if (message) {
      log.msg =
        (Object.prototype.toString.call(message) === '[object String]')
          ? message
          : message.toString();
    }

    if (Logger._isDefined(error)) {
      log.error = error.toString();
    }

    try {
      console.log(JSON.stringify(log));
    } catch (error) {
      console.log('Error converting logging JSON to a string.');
    }
  }

  public log(message: any): void { this._write(Logger.LEVEL_INFO, message); }
  public info(message: any): void { this._write(Logger.LEVEL_INFO, message); }
  public debug(message: any): void { this._write(Logger.LEVEL_DEBUG, message); }
  public warn(message: any): void { this._write(Logger.LEVEL_WARN, message); }
  public error(message: any, error?: any): void { this._write(Logger.LEVEL_ERROR, message, error); }
}
