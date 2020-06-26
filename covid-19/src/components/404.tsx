import React from 'react';
import useStyles from '../styles/mapStyle';


const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.parentDiv}>
            <h1>Page not found</h1>
            <a href='/'>
                Go back home
            </a>
        </div>
    )
}

export default NotFound;