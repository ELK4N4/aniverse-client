import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BansContainer from './BansContianer';
import AdminsContainer from './AdminsContianer';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AnimesContainer from './AnimesContainer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} overflow="hidden">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

function PanelTabs({ selectedTab }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const { fansubId } = useParams();
  const params = new URLSearchParams(location.search);
  const tabIndex = params.get('tab');
  const [value, setValue] = useState(parseInt(tabIndex) || 0);

  useEffect(() => {
    setValue(parseInt(tabIndex) || 0)
  }, [tabIndex])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.replace({
      search: `?tab=${newValue}`,
    })
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator
          }}
          variant="fullWidth"
        >
          <Tab label="אדמינים" id="1" />
          <Tab label="באנים" id="2" />
          <Tab label="אנימות" id="3" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis="x-reverse"
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AdminsContainer />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <BansContainer />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <AnimesContainer />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default PanelTabs;