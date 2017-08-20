import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from 'components/App';

const errorLoading = (error) => {
    console.error('Dynamic page loading failed', error);
}

const loadRoute = (cb) => {
    return (module) => { cb(null, module.default); };
}

export default (
    <Route path="/" component={App} >
        <IndexRoute
			getComponent={(nextState, cb) => {
				require.ensure([], (require) => require('components/pages/HotelsSearch'), 'HotelsSearch')
				.then(loadRoute(cb))
				.catch(errorLoading);
			}}/>
		<Route
			path="/hotels"
			getComponent={(nextState, cb) => {
            require.ensure([], (require) => require('components/pages/HotelsListing'), 'HotelsListing')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }}/>
    </Route>
)
