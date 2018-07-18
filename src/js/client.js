import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';

// Layouts
import Layout from "./components/layout/Layout";

// Pages
import Favorites from "./pages/Favorites";
import Ftps from "./pages/Ftps";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";

import store from "./store"

import Bootstrap from "Bootstrap";

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename="/">
            <Layout>
                <Switch>
                    <Route exact path="/" component={Ftps} />
                    <Route path="/bets" component={Settings} />
                    <Route path="/plan" component={Plans} />
                    <Route path="/meal" component={Favorites} />
                    <Route path="/hard" component={Settings} />
                </Switch>
            </Layout>
        </HashRouter>
    </Provider>
    , app
);
