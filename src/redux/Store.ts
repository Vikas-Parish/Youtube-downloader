import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {TypedUseSelectorHook, useSelector} from 'react-redux';
import videoReducer from './reducers/Downloads';

const rootReducer = combineReducers({
  download: videoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
