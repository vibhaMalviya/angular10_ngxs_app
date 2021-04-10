import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { AnalysisChart } from '../../entities/AnalysisChart';
import { TimeseriesService } from '../../services/timeseries.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  chartObj: AnalysisChart;
  @ViewChild('pxChart') pxChart: ElementRef;
  showOverlay: boolean;
  @Input()
  set chart(value: AnalysisChart) {
    if (this.chartObj !== value) {
      this.chartObj = value;
      this.populateChart();
    }
  }
  constructor(private readonly chartService: ChartService, private readonly timeseriesService: TimeseriesService) {
    this.showOverlay = false;
  }

  populateChart() {
    const tags = this.chartService.getTagsForTS(this.chartObj);
    if (tags.length) {
      this.timeseriesService.getTimeseriesData(tags)
        .subscribe((response) => {
          console.log('response %o', response);
          this.drawChart(response.queries);
        }, error => {
          console.log(` Error getting timeseries data for chart ${this.chartObj.id} : ${error}`);
        });
    }
  }

  drawChart(res) {
    if (res) {
      const tsData = res.map(query => query.results[0]);
      const config = this.chartService.getSeriesConfig(tsData);
      const chartData = this.chartService.convertChartData(tsData);
      const yAxisConfig = this.chartService.getYAxisConfig();
      const regConfig = this.chartService.getRegisterConfig();

      this.pxChart.nativeElement.set('seriesConfig', config);
      this.pxChart.nativeElement.set('chartData', chartData);
      this.pxChart.nativeElement.set('yAxisConfig', yAxisConfig);
      this.pxChart.nativeElement.set('registerConfig', regConfig);

      this.pxChart.nativeElement.notifyResize();
    }
  }
  dragover(e) {
    e.preventDefault();
  }
  dragEnter(e){
    this.showOverlay = true;
  }
  dragLeave(e){
    this.showOverlay = false;
  }
  drop(ev) {
    const draggedNode = JSON.parse(ev.dataTransfer.getData('text'));
    this.showOverlay = false;
  }
}
