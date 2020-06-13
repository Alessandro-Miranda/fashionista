import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Routes from '../../routes';

const App = () => (
    <BrowserRouter>
      <Topbar />
      <Routes />
    </BrowserRouter>
);

export default App;