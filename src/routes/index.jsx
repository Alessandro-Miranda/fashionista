import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import CatalogoRoute from './CatalogoRoute';
import PesquisaRoute from './PesquisaRoute';

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <HomeRoute />
        </Route>
        <Route path="/catalogo/product=:code_color">
            <CatalogoRoute />
        </Route>
        <Route path="/pesquisa">
            <PesquisaRoute />
        </Route>
    </Switch>
);

export default Routes;