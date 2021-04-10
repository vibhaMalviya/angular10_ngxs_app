import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TimeseriesState, TimeseriesStateModel } from './timeseries.state';
import { TimeseriesAction } from './timeseries.actions';

describe('Timeseries store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TimeseriesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: TimeseriesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new TimeseriesAction('item-1'));
    const actual = store.selectSnapshot(TimeseriesState.getState);
    expect(actual).toEqual(expected);
  });

});
