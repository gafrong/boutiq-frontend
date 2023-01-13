import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {PortalProvider} from '@gorhom/portal'

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

// Context API
import Auth from './Context/store/Auth';

// Navigators
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';

LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

const toastConfig = {
  success: (props) => (
      <BaseToast
          {...props}
          style={{ borderLeftColor: 'tomato', backgroundColor: 'tomato', color: '#fff' }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#fff'
          }}
          text2Style={{
            fontSize: 13,
            color: '#fff'
          }}
      />
  ),
  error: (props) => (
      <ErrorToast
          {...props}
          text1Style={{
              fontSize: 17
          }}
          text2Style={{
              fontSize: 15
          }}
      />
  ),
  tomatoToast: ({ text1, text2 }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato', padding: 10, borderRadius:10, marginLeft:30, marginRight: 30 }}>
          <Text style={{color: '#fff', fontWeight:'700'}}>{text1}</Text>
      </View>
  )
}

export default function App() {
  return (  
      <Auth>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <PortalProvider>
              <NavigationContainer>
                {/* <Header /> */}
                <Main/>
                <Toast forwardRef={(ref) => Toast.setRef(ref)} config={toastConfig} />
              </NavigationContainer>
            </PortalProvider>
          </PersistGate>
        </Provider>
      </Auth>
  );
}


