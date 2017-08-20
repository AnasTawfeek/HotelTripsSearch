import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import store from './store';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

console.log(`%c
    _____ ___     ___  ___  _    _  ___   _
   |_   _/ _ \\   |_  |/ _ \\| |  | |/ _ \\ | |
     | |/ /_\\ \\    | / /_\\ \\ |  | / /_\\ \\| |
     | ||  _  |    | |  _  | |/\\| |  _  || |
     | || | | |/\\__/ / | | \\  /\\  / | | || |____
     \\_/\\_| |_/\\____/\\_| |_/\\/  \\/\\_| |_/\\_____/
`, "color: #ff8400; text-shadow: #000 1px 1px;")
console.log(
	`%cVersion ${__VERSION__}`,
	"color: #0078d7; font-family: sans-serif; font-size: 1.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
);

if(module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept(
      './reducers',
      './components',
      () => store.replaceReducer(reducers)
    );
  }
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={enUS}>
			<Router onUpdate={() => { window.scrollTo(0, 0); }} routes={routes} history={history} />
        </LocaleProvider>
    </Provider>, document.getElementById('tajawalApp'));
