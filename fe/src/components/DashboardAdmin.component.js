import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbarr from './Navbar.component';
import {AccountCircle,CircleNotifications} from '@mui/icons-material';
import AdminUser from './AdminUser.component';
import AdminNotification from './AdminNotification.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const DashboardAdmin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbarr />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          style={{width:400}}
        >
          {/* <Tab icon={<Dashboard/>} label={"Dashboard"} {...a11yProps(0)} /> */}
          <Tab icon={<AccountCircle/>} label="Users" {...a11yProps(0)} />
          <Tab icon={<CircleNotifications/>} label="Notifications" {...a11yProps(1)} />
        </Tabs>
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <AdminUser/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminNotification/>
        </TabPanel>
      </Box>
    </>
  );
}

export default DashboardAdmin
