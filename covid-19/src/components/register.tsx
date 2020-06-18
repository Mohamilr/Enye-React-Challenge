import React, { useState, FC, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { NavLink, Redirect } from 'react-router-dom';
import { signInWithGoogle } from '../auth/firebase.config';
import { AuthProvider } from '../utils/useContext';

const useStyle = makeStyles((theme) => ({
    parentDiv: {
        margin: '0 auto',
        textAlign: 'center',
        width: '30em'
    },
    formDiv: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        margin: '10px'
    }
}))

// interface Prop {
//     setEmail: (value: string) => void,
//     setPassword: (value: string) =>void,
//     handleSubmit: (e: any) => void
// }
const Register: FC = () => {
    const classes = useStyle();
    const { verified } = useContext(AuthProvider);
    // const verified = localStorage.getItem('verified')
    if(verified) {
        return <Redirect to='/authorized' />
    }

    return (
        <div className={classes.parentDiv}>
            <h2>To see Search History Sign in</h2>
            {/* <form className={classes.formDiv} onSubmit={(e: any) => handleSubmit(e)}>
            <TextField className={classes.textField} id="outlined-basic" label="Email" variant="outlined" onChange={(e: any) => setEmail(e.target.value)} />
            <TextField className={classes.textField}
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e: any) => setPassword(e.target.value)}
        />
            <Button onClick={(e: any) => handleSubmit(e)} variant="outlined" color="primary">
        Submit
      </Button> */}
      <Button onClick={(e: any) => signInWithGoogle()} variant="outlined" color="secondary">
        Sign in with google
      </Button>
            {/* </form> */}
        </div>
    );
}

export default Register;