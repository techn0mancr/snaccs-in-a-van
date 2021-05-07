import history from "../history";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function Back() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton 
            // onClick=history.go
            aria-label="back">
                <ArrowBackIosIcon />
            </IconButton>


        </div>

    )

    

}