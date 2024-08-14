import type {
  Action,
  ListenerEffectAPI,
  ThunkAction,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit';
import {
  addListener,
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import type { UserState } from './slices/user';
import userSliceReducers from './slices/user';
const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const rootReducer = combineReducers({
  user: userSliceReducers,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore<{
    user: UserState;
  }>({
    reducer: rootReducer,
    preloadedState,
  });
}
export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening = listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;
