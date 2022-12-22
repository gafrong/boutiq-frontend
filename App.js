import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {PortalProvider} from '@gorhom/portal'

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import { persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Context API
import Auth from './Context/store/Auth';

// Navigators
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);


export default function App() {
  return (  
      <Auth>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <PortalProvider>
              <NavigationContainer>
                {/* <Header /> */}
                <Main/>
                <Toast forwardRef={(ref) => Toast.setRef(ref)} />
              </NavigationContainer>
            </PortalProvider>
          </PersistGate>
        </Provider>
      </Auth>
  );
}


