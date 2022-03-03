import { AppBar, Toolbar, makeStyles, Typography } from "@material-ui/core"
import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import styled from 'styled-components'

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    Database Page
                </Typography>
                <Link to="/database-sample"><HomeIcon /></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header