import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './reducers/User';
import Categories from './reducers/Categories';
import Donations from './reducers/Donations';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const configration = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const rootReducer = combineReducers({
  user: User,
  categories: Categories,
  donation: Donations,
});

const persistedReducer = persistReducer(configration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
persistor.purge(); // to update data in the store when we make changes to the store structure, this will clear the old data and update it with the new structure.
