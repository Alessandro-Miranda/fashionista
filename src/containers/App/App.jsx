import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Routes from '../../routes';

import { Store, persistor } from '../../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor} >
    <BrowserRouter>
      <Topbar />
      <Routes />
    </BrowserRouter>
    </PersistGate>
    </Provider>
);

export default App;