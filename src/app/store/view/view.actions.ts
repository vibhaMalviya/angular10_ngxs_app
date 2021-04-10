import { DataCard } from '../../entities/DataCard';
import { AnalysisChart } from '../../entities/AnalysisChart';

export class GetTemplate {
  public static readonly type = '[Template] GetTemplate';
  constructor(public viewId) { }
}

export class AddCard {
  public static readonly type = '[View] Add Card';
  constructor(public card: DataCard) { }
}

export class AddChart {
  public static readonly type = '[View] Add Chart';
  constructor(public chart: AnalysisChart) { }
}

export class ReorderPlottedCharts {
  public static readonly type = '[View] Reorder Charts';
  constructor(public fromIndex: number, public toIndex: number) { }
}

export class LoadDefaultView {
  public static readonly type = '[View] LoadDefaultView';
  constructor(public context: string, public viewId: string) { }
}
