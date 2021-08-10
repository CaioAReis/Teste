import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/cadastro"  component={Cadastro}/>
            </Switch>
        </BrowserRouter>
    );
}