export class TimeseriesStateModel {
    chartData: Map<string, any>;

    static default(): TimeseriesStateModel {
        return {
            chartData: null
        };
    }
}
