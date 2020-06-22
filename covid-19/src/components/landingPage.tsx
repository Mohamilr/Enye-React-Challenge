import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { signInWithGoogle } from '../config/firebase.config';
import { AuthProvider } from '../utils/useContext';
import Svg from '../asset/svg';
import useStyles from '../styles/mapStyle';
import QueryH from './apolloQuery';


const LandingPage = () => {
    const classes = useStyles();

    const { verified } = useContext(AuthProvider);

    if (verified) {
        return <Redirect to='/authorized' />
    }

    return (
        <div style={{ height: '100vh' }}>
            <div className={classes.container}>
                <div className={classes.virusText}>
                    <h1>Coronavirus:</h1>
                    <h3>Seek immediate medical attention if you have serious symptoms</h3>
                    <h4>Find Health centers by location</h4>
                    <Button onClick={(e: any) => signInWithGoogle()} variant="outlined" color="secondary">
                        Sign in with google
                    </Button>
                    <QueryH />
                </div>
                <div>
                    <Svg />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;