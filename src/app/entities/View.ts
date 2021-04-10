import { DataCard } from './DataCard';
import { MetaCard } from './MetaCard';
import { Template } from './Template';
import {v4 as uuidv4} from 'uuid';

export class View implements Template{
  id: string;
  title: string;
  tags: Array<any>;
  slug: string;
  cards: Array<DataCard>;
  metaCard: MetaCard;

  constructor(view?: View) {
    this.slug = 'analysis-view-v1';
    this.id = view ? view.id : uuidv4();
    this.title = view ? view.title : 'New Adhoc Analysis';
    this.tags = view ? view.tags : [];
    this.cards = view ? this.populateDataCards(view.cards) : this.populateDataCards();
    this.metaCard = view ? this.populateMetaCard(view.cards) : this.populateMetaCard();
  }

  populateDataCards(cards?: Array<any>): Array<DataCard> {
    let dataCards = [];
    if (cards) {
      dataCards = cards[0].attributes.dataCards;
    } else {
      const card = new DataCard();
      dataCards.push(card);
    }
    return dataCards;
  }

  populateMetaCard(cards?): MetaCard {
    let metaCard = new MetaCard();
    if (cards) {
      metaCard = cards[0].attributes.metaCard;
    }
    return metaCard;
  }
}
