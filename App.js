/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Root } from "native-base";
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import InitApp from './src/InitApp';

const App: () => React$Node = () => {
  return (
    <Root>
      <Provider store={store}>
        <InitApp/>
      </Provider>
    </Root>
  );
};


export default App;
