import React, { useState, FC } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../styles/mapStyle';

//  Search input props
interface Prop {
    propObject: {
        setSearchKey: (value: string) => void,
        searchKey: string,
        handleSubmit: (e: any) => void,
        handleLocation: () => Promise<void>,
        handleSearch: () => Promise<void>,
        setLocation: (value: string) => void
    }
}

const SearchInput: FC<Prop> = ({ propObject }) => {
    const classes = useStyles();
    const [validateKey, setValidateKey] = useState<boolean>(false);
    const [validateLocation, setValidateLocation] = useState<boolean>(false);
    const [validateError, setValidateError] = useState<boolean>(false);

    // hospital or pharmacy onchange action
    const handleSearchKeyAction = (e: any) => {
        if (e.target.value !== '') {
            setValidateKey(true)
        }
        propObject.setSearchKey(e.target.value)
    }

    // Location onchange action
    const handleLocationAction = (e: any) => {
        if (e.target.value !== '') {
            setValidateLocation(true)
        }
        propObject.setLocation(e.target.value);
    }

    const handleSearchAction = (e: any) => {
        e.preventDefault();
        if (validateKey && validateLocation) {
            propObject.handleLocation();
            propObject.handleSearch();
            propObject.handleSubmit(e);
            setValidateError(false);
        }
        else {
            setValidateError(true);
        }
    }

    return (
        <div className={classes.parentDiv}>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Hospital, Pharmacy"
                    value={propObject.searchKey}
                    required
                    onChange={e => handleSearchKeyAction(e)}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider orientation="vertical" flexItem />
                <InputBase
                    className={classes.input}
                    placeholder="Location"
                    required
                    onChange={e => handleLocationAction(e)}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Tooltip title="Search">
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={e => handleSearchAction(e)}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            {/* validation prompt */}
            <div>
                {validateError ? <p style={{ color: 'red' }}>Enter search key and location</p> : ''}
            </div>
        </div>
    );
}

export default SearchInput;