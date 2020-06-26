import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Loader from '../utils/loader';
const LandingPage = lazy(() => import('../components/landingPage'));
const Map = lazy(() => import('../components/map/map'));
const NotFound = lazy(() => import('../components/404'));

const Routes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <PrivateRoute path='/authorized' component={Map} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default Routes;