/**
 * Class for parsing and giving access to the VCAP service bindings and config.
 */
import { Logger } from './logger';

export class VcapServices {
  private vcapServices: any;
  private serviceCredentials: {} = {};

  constructor(vcapServicesString: string, private readonly logger: Logger) {
    this._parseVcapServices(vcapServicesString);
  }

  private _parseVcapServices(vcapServicesString: string): void {
    this.vcapServices = JSON.parse(vcapServicesString);

    let serviceName;
    for (const service of this.vcapServices['user-provided']) {
      serviceName = service.name;
      this.logger.info('Found service binding: ' + serviceName);
      this.serviceCredentials[serviceName] = service;
    }
  }

  public getApplicationUri(appName: string): string {
    return this.serviceCredentials[appName].credentials.uri || null;
  }
  //
  // public getStufUri(): string {
  //   return this._serviceCredentials['stuf']['credentials']['configServiceUrl'] || null;
  // }
  //
  // public getUserServicesUrl(): any {
  //   return this._serviceCredentials['stuf']['credentials']['userServiceUrl'] || null;
  // }
}
