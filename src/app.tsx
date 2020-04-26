import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { HomePage } from './pages';
import { Header } from './components';
import { store, browserHistory } from './redux/store';

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default App;
