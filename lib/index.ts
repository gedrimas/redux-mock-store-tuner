import { CombinedState } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

type AllKeysOfStore<O, K = O[keyof O]> =
  | keyof O
  | (K extends any[] ? never : K extends object ? AllKeysOfStore<K> : never);

type AllValuesOfStore<T, K, I = K, B = K> = K extends keyof T
  ? T[K] extends string | number | null | any[] | boolean
    ? [K, T[K]]
    : T[K] extends object
    ? [K, T[K]]
    : never
  : I extends keyof T
  ? AllValuesOfStore<T[I], B>
  : never;

export default class ReduxStoreMocker<T> {
  protected readonly initialReduxState: CombinedState<T>;

  constructor(protected readonly appStore: CombinedState<T>) {
    this.initialReduxState = this.parseStateToPlainObject(appStore);
  }

  protected parseStateToPlainObject(state: CombinedState<T>) {
    const stateAsJSON = JSON.stringify(state);
    const stateAsPlainObject = JSON.parse(stateAsJSON);
    return stateAsPlainObject;
  }

  protected changeStoreObject(
    initialStore: any,
    keyMockProps: any,
    valMockProps: any,
    mockProps: any
  ) {
    for (const keyInitialStore in initialStore) {
      if (keyInitialStore === keyMockProps) {
        initialStore[keyInitialStore] = valMockProps;
      } else if (typeof initialStore[keyInitialStore] === 'object') {
        const innerPartOfStore = initialStore[keyInitialStore];
        this.changeStoreObject(
          innerPartOfStore,
          keyMockProps,
          valMockProps,
          mockProps
        );
      }
    }
  }

  public updateMockStore(
    this: ReduxStoreMocker<T>,
    mockProps: AllValuesOfStore<
      CombinedState<T>,
      AllKeysOfStore<CombinedState<T>>
    >[]
  ) {
    const initialStore = this.initialReduxState;

    for (let keyMockProps of mockProps) {
      const [keyMocksTyped, valMockProps] = keyMockProps as any;
      this.changeStoreObject(
        initialStore,
        keyMocksTyped,
        valMockProps,
        mockProps
      );
    }

    return configureStore([thunk])(initialStore);
  }
}
