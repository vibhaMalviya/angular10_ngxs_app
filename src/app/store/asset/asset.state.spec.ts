import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AssetState, AssetStateModel } from './asset.state';
import { AssetAction } from './asset.actions';

describe('Asset store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AssetState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: AssetStateModel = {
      items: ['item-1']
    };
    store.dispatch(new AssetAction('item-1'));
    const actual = store.selectSnapshot(AssetState.getState);
    expect(actual).toEqual(expected);
  });

});
