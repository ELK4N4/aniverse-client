import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AppBar, makeStyles, Tab, Tabs, useTheme } from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import TabContainer from './TabContainer';
import { useHistory, useLocation, useParams } from 'react-router';
import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    margin: 0,
  },
  indicator: {
    backgroundColor: 'white',
  },
}));

function TabsGroup({ children }) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const params = new URLSearchParams(location.search);
    const pathName = params.get('tab');
    const [value, setValue] = useState(pathName);
    const filteredChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
    const paths = React.Children.map(filteredChildren, child => {
      return child.props.path;
    });
    
    const pathIndex = useMemo(() => {
      if(paths.findIndex(path => path === value) === -1) {
        return 0;
      } else {
        return paths.findIndex(path => path === value)
      }
    }, [value]);

    useEffect(() => {
      setValue(pathName)
    }, [pathName]);
  
    const handleChange = (event, index) => {
      setValue(paths[index]);
      history.replace({
        search: `?tab=${paths[index]}`,
      })
    };

    const handleChangeIndex = (index) => {
      setValue(paths[index]);
    };

    const tabs = React.Children.map(filteredChildren, (child, index) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        child = React.cloneElement(child);
      }
      
      return <Tab label={child.props.label} id={index} />;
    });

    const contianers = React.Children.map(filteredChildren, (child, index) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        child = React.cloneElement(child);
      }
      
      return <TabPanel value={pathIndex} index={index} dir={theme.direction}>{child}</TabPanel>;
    });

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={pathIndex}
            onChange={handleChange}
            classes={{
              indicator: classes.indicator
            }}
            variant="fullWidth"
          >
            {tabs}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x-reverse"
          index={pathIndex}
          onChangeIndex={handleChangeIndex}
        >
          {contianers}
        </SwipeableViews>
      </div>
    );
  }
  
export default TabsGroup;
export { TabContainer };