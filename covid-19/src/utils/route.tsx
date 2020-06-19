import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Loader from './loader';
const LandingMap = lazy(() => import('../components/landingMap'));
// const AuthorizedMap = lazy(() => import('../components/authorized/authorizedMap'));

const Routes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingMap} />
                    {/* <PrivateRoute exact path='/authorized' component={AuthorizedMap} /> */}
                </Switch>
            </Router>
        </Suspense>
    );
}

export default Routes;