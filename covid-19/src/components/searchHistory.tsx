import React, { useState, FC } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyle = makeStyles(() => ({
    parentDiv: {
        margin: '0 auto',
        textAlign: 'center',
        width: '30em'
    },
    historyDiv: {
      maxHeight: '100vh',
      overflowY: 'scroll'
    }
}))

interface Prop {
    searchHistory: string[],
    setSearchKey: (value: string) => void,
    handleSearch: () => Promise<void>
}

const SearchHistory: FC<Prop> = ({ searchHistory, setSearchKey, handleSearch }) => {
    const classes = useStyle();
    return (
        <div className={classes.parentDiv}>
          <h3>Search History</h3>
            <List className={classes.historyDiv} component="nav" aria-label="Search History">
              {searchHistory.map((searchString, index) => (
                <ListItem key={index} button divider>
        <ListItemText onClick={(e: any) => { 
          setSearchKey(e.target.textContent);
          handleSearch();
          }}>
            {searchString}
            </ListItemText>
      </ListItem>
              ))}
    </List>
        </div>
    );
}

export default SearchHistory;