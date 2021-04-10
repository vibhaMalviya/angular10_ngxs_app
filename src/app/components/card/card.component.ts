import { Component, Input, OnInit } from '@angular/core';
import { DataCard } from '../../entities/DataCard';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AnalysisChart } from '../../entities/AnalysisChart';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AddChart, ReorderPlottedCharts } from '../../store/view/view.actions';

@Component({
  selector: 'analysis-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  showOverlay: boolean;
  @Select(state => state.viewState.currentCardId) currentCardId$: Observable<string>;
  card: DataCard;
  constructor(private readonly store: Store) {
    this.showOverlay = false;
  }

  ngOnInit(): void {
    this.currentCardId$.subscribe((cardId) => {
        this.populateCard(cardId);
      });
  }

  populateCard(currentCardId) {
    if (currentCardId) {
      this.card = this.store.selectSnapshot(state => state.viewState.cards.get(currentCardId));
    }
  }

  onChartTypeSelection(event) {
    const newChart = new AnalysisChart({ type: event.itemData });
    this.addNewChart(newChart);
    console.log(event.itemData);
  }

  onChartDragStart() {
  }

  onChartDragEnd(event) {
    if (event.fromData === event.toData){
      this.reorderPlottedCharts(event.fromIndex, event.toIndex);
    }
  }
  @Dispatch() addNewChart = (chart: any) => new AddChart(chart);
  @Dispatch() reorderPlottedCharts = (fromIndex: number, toIndex: number) => new ReorderPlottedCharts(fromIndex, toIndex);
}
