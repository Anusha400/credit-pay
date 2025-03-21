import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const MyList = () => {
  const items = ['Item 1', 'Item 2'];

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} button>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default MyList;
