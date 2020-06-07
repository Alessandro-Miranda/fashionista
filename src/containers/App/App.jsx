import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Routes from '../../routes';
import Footer from '../../components/Footer';

const App = () => (
    <BrowserRouter>
      <Topbar />
      <Routes />
      <Footer />
    </BrowserRouter>
);

export default App;