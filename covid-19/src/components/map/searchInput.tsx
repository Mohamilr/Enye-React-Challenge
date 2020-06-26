import React, { useState, FC, useContext } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../styles/mapStyle';
import { AuthProvider } from '../../utils/useContext';
//
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

//  Search input props
export interface Prop {
    propObject: {
        setSearchKey: (value: string) => void,
        searchKey: string,
        location: string,
        // handleSubmit: (e: any) => void,
        handleLocation: (location: string) => Promise<void>,
        handleSearch: (searchKey: string, radius: number) => Promise<void>,
        setLocation: (value: string) => void,
        setRadius: (value: number) => void,
        radius: number,
    }
}

const saveSearch = gql`
mutation ($userID: String, $searchString: String, $location: String, $radius: Int) {
    addSearch(searchItem:{ searchString: $searchString, location: $location, userId: $userID, radius: $radius } ) {
      searchString,
      location,
      userId,
      radius
    }
  }
`;

const SearchInput: FC<Prop> = ({ propObject }) => {
    const classes = useStyles();
    const [validateKey, setValidateKey] = useState<boolean>(false);
    const [validateLocation, setValidateLocation] = useState<boolean>(false);
    const [validateRadius, setValidateRadius] = useState<boolean>(false);
    const [validateError, setValidateError] = useState<boolean>(false);
    const { userId } = useContext(AuthProvider);

    const [addSearch] = useMutation(saveSearch, {
        variables: {
            userID: userId,
            searchString: propObject.searchKey,
            location: propObject.location,
            radius: +propObject.radius
        }
    });


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

    // Location onchange action
    const handleRadius = (e: any) => {
        if (e.target.value !== 0) {
            setValidateRadius(true)
        }
        propObject.setRadius(e.target.value);
    }

    const handleSearchAction = (e: any) => {
        e.preventDefault();
        if (validateKey && validateLocation && validateRadius) {
            // propObject.handleLocation(propObject.location)
            propObject.handleSearch(propObject.searchKey, propObject.radius);
            // propObject.handleSubmit(e);
            userId && propObject.searchKey && propObject.location && propObject.radius && addSearch()
            setValidateError(false);
        }
        else {
            setValidateError(true);
        }
    }

    return (
        <div >
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Hospital, Pharmacy ..."
                    onChange={e => handleSearchKeyAction(e)}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider orientation="vertical" flexItem />
                <InputBase
                    className={classes.input}
                    placeholder="Location"
                    onChange={e => handleLocationAction(e)}
                    onBlur={e => propObject.handleLocation(e.target.value)}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider orientation="vertical" flexItem />
                <InputBase
                    style={{ width: '4em' }}
                    // className={classes.input}
                    placeholder="0"
                    required
                    type="number"
                    onChange={e => handleRadius(e)}
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
                {validateError ? <p style={{ color: 'red', textAlign: 'center' }}>Enter search key, location and kilometer</p> : ''}
            </div>
        </div>
    );
}

export default SearchInput;