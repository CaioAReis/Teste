import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/cadastro"  component={Cadastro}/>
                <Route path="/produto"  component={Produto}/>
                <Route path="/carrinho"  component={Carrinho}/>
            </Switch>
        </BrowserRouter>
    );
}