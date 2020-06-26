import React, { FC } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyle from '../../styles/mapStyle';

interface Prop {
  searchHistory: string[],
  setSearchKey: (value: string) => void,
  handleSearch: (searchKey: string, radius:number) => Promise<void>,
  handleLocation: (location: string) => Promise<void>,
}


const SearchHistory: FC<Prop> = ({ searchHistory, setSearchKey, handleSearch, handleLocation }) => {
  const classes = useStyle();


  const handlePreviousSearch = (location: string, searchString: string, radius:number) => {
    // setSearchKey(e.target.textContent);
    handleLocation(location)
    handleSearch(searchString, radius);
  }

  return (
    <div className={classes.parentDiv}>
      <h3>Search History</h3>
      <List className={classes.historyDiv} component="nav" aria-label="Search History">
        {searchHistory.map((data: any, index) => (
          <ListItem key={index} button divider>
            <ListItemText onClick={(e: any) => handlePreviousSearch(data.location, data.searchString, data.radius)}>
              {`${data.searchString} in ${data.location} by ${data.radius} km`}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchHistory;