import store from './reduxStore';
import ReduxStoreMocker from '../lib/index';

describe('updateMockStore', () => {
  test('does updateMockStore change store', () => {
    const mockStore = new ReduxStoreMocker(store.getState());
    const updatedStore = mockStore.updateMockStore([
      ['house', 'new'],
      ['numberOfFloor', 2],
      ['soft', false],
      ['color', 'white'],
    ]);

    const state: any = updatedStore.getState();

    expect(state.house).toEqual('new');
    expect(state.floor.numberOfFloor).toEqual(2);
    expect(state.floor.flat.livingRoom.sofa.soft).toEqual(false);
    expect(state.floor.flat.livingRoom.sofa.pillows.biggestOne.color).toEqual(
      'white'
    );
  });
});
