import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Loader from './loader';
const LandingPage = lazy(() => import('../components/landingPage'));
const Map = lazy(() => import('../components/map'));;

const Routes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <PrivateRoute exact path='/authorized' component={Map} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default Routes;