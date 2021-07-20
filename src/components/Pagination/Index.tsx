import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(4),
      },
			display: 'flex',
			justifyContent: 'flex-end'
    },
  }),
);

interface PageParam {
	count: number;
	page: number;
	handleChange: Function;
}

export default function PaginationRounded({count, page, handleChange}: PageParam) {
  const classes = useStyles();

	let pageCount = count / 9
	pageCount = Math.ceil(pageCount)

  return (
    <div className={classes.root}>
      <Pagination count={pageCount} page={page} onChange={(e, value) => handleChange(value)} variant="outlined" shape="rounded" />
    </div>
  );
}