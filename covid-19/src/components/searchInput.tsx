import React, { FC } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../styles/mapStyle';


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
    return (
        <div className={classes.parentDiv}>
            <Paper component="form" className={classes.root}>

                <InputBase
                    className={classes.input}
                    placeholder="Hospital, Pharmacy"
                    value={propObject.searchKey}
                    required
                    onChange={e => {
                        propObject.setSearchKey(e.target.value)
                    }}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider orientation="vertical" flexItem />
                <InputBase
                    className={classes.input}
                    placeholder="Location"
                    required
                    onChange={e => {
                        propObject.setLocation(e.target.value)
                    }}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Tooltip title="Search">
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={e => {
                        e.preventDefault();
                        propObject.handleLocation();
                        propObject.handleSearch();
                        propObject.handleSubmit(e);
                    }}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
        </div>
    );
}

export default SearchInput;