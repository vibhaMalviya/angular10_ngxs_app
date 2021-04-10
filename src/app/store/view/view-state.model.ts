import { Template } from '../../entities/Template';
import { DataCard } from '../../entities/DataCard';

export class ViewStateModel {

  cards: Map<string, DataCard>;
  cardIds: Array<string>;
  currentCardId: string;
  viewName: string;

  static default(): ViewStateModel {
    return {
      viewName: '',
      cards: null,
      cardIds: [],
      currentCardId: ''
    };
  }
}
