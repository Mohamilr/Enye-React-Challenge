import React from 'react';
import { NavLink } from 'react-router-dom';
import useStyles from '../styles/mapStyle';


const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.parentDiv}>
            <h1>Page not found</h1>
            <NavLink to='/'>
                Go back home
            </NavLink>
        </div>
    )
}

export default NotFound;