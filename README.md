# redux-mock-store-tuner

This is just wrapper of the redux-mock-store that allows you to update current Redux store of your application to let your testing React-component get appropriate state of storage. Be aware that the package needs TypeScript version not less than 4.1.3, because only from that version TypeScript provides ability of recursive types inferring.

## Installation

```sh
npm i redux-mock-store-tuner -D
```

## Usage

### Javascript or TypeScript

```javascript
import store from './path_of_your_app_store';
import ReduxStoreMocker from 'redux-mock-store-tuner';

const mockStore = new ReduxStoreMocker(store.getState());
const updatedStore = mockStore.updateMockStore([
  ['house', 'new'],
  ['numberOfFloor', 2],
  ['soft', false],
  ['color', 'white'],
]);

// than your can pass the store to the Provider in tests
const wrapper = mount(
  <Provider store={updatedStore}>
    <Router>
      <TestingComponent />
    </Router>
  </Provider>
);
```
