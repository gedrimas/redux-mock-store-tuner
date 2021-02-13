import {
  createSlice,
  PayloadAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

interface NestedState {
  house: string;
  floor: {
    numberOfFloor: number;
    flat: {
      livingRoom: {
        sofa: {
          soft: boolean;
          pillows: {
            biggestOne: {
              color: string;
            };
          };
        };
      };
    };
  };
}

let initialState: NestedState = {
  house: 'built in 1950',
  floor: {
    numberOfFloor: 5,
    flat: {
      livingRoom: {
        sofa: {
          soft: true,
          pillows: {
            biggestOne: {
              color: 'black',
            },
          },
        },
      },
    },
  },
};

const NestedStateSlice = createSlice({
  name: 'paginationSlice',
  initialState,
  reducers: {
    setHouse(state, action: PayloadAction<string>) {
      state.house = action.payload;
    },
  },
});

const reducer = NestedStateSlice.reducer;

const store = configureStore({ reducer });

export default store;
