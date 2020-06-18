import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
const LandingMap = lazy(() => import('../components/landingMap'));
const AuthorizedMap = lazy(() => import('../components/authorized/authorizedMap'));

const Routes = () => {
    return (
        <Suspense fallback='Loading ...'>
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingMap} />
                    <PrivateRoute exact path='/authorized' component={AuthorizedMap} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default Routes;