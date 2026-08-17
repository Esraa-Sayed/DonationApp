import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NavigationContainer } from '@react-navigation/native';

import { checkToken } from './Api/user';
import RootNavigation from './navigation/RootNavigation';
import store, { persistor } from './redux/store';

const App = () => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('You have come back into the app');
        await checkToken();
        //we are coming from background to the foreground
      }

      appState.current = nextAppState;
    });
    checkToken();
    console.log('Application has rendered');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
