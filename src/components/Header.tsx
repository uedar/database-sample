import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>Database Page</Typography>
                <Link to="/database-sample"><HomeIcon /></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header