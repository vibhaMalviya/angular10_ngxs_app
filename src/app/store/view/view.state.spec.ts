import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ViewState } from './view.state';
import { GetAllTemplates } from './view.actions';
import { ViewStateModel} from './view-state.model';

describe('Template store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ViewState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: ViewStateModel = {
      templates: [],
      viewId: null,
      assetId: null,
      context: null
    };
    store.dispatch(new GetAllTemplates());
  });

});
