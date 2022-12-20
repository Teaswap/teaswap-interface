import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const AntTabs = withStyles({
  root: {
    borderBottom: '0.5px solid #FFFFFF', fontSize: '14px',
  },
  indicator: {
    backgroundColor: '#DCDCDC',
  },
})(Tabs);

const AntTab = withStyles(() => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    // fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing(4),
    fontSize: '14px',
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#474747',
      opacity: 1,
    },
    '&$selected': {
      color: '#474747',
      // fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#474747',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    // padding: theme.spacing(3),
  },
  demo1: {
    // backgroundColor: theme.palette.background.paper,
  },
}));

interface Params {
	tabs: Array<String>;
	value: String;
	handleChange: Function;
}

export default function CustomizedTabs({tabs, value, handleChange}: Params) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={(e, v) => handleChange(v)} aria-label="ant example">
					{tabs.map((v, i) => {
						const tabProps={
							label: v,
							value: v
						}
          	return <AntTab key={i} {...tabProps} />
					})}
        </AntTabs>
        <Typography className={classes.padding} />
      </div>
    </div>
  );
}
