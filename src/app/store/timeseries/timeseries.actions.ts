export class GetTimeseriesData {
  public static readonly type = '[Timeseries] GetTimeseriesData';
  constructor(public chartId: string, public tags: Array<string>) {
  }
}
