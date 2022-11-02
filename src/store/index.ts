import type {
  Action,
  ListenerEffectAPI,
  ThunkAction,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit';
import { addListener, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import type { UserState } from './slices/user';
import userSliceReducers from './slices/user';
const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

export const store = configureStore<{
  user: UserState;
}>({
  reducer: {
    user: userSliceReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
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
