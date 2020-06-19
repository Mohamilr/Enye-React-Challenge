import React, { useState, FC } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyle from '../styles/mapStyle';

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
              {searchHistory.map((data: any, index) => (
                <ListItem key={index} button divider>
        <ListItemText onClick={(e: any) => { 
          setSearchKey(e.target.textContent);
          
          handleSearch();
          }}>
            {data.searchString}

            {/* {`${data.searchString} in ${data.location}`} */}
            </ListItemText>
      </ListItem>
              ))}
    </List>
        </div>
    );
}

export default SearchHistory;