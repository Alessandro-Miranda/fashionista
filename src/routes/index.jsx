import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import CatalogoRoute from './CatalogoRoute';

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <HomeRoute />
        </Route>
        <Route path="/catalogo/product=:name">
            <CatalogoRoute />
        </Route>
    </Switch>
);

export default Routes;