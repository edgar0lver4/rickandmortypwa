import React from 'react';
import logo from '../../logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

const navStyles = makeStyles({
    navbar:{
        color:'#fff',
        background:'#000000',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding: '10px'
    },
    formControl:{
        minWidth:'300px',
    },
    logo:{
        width:'150px'
    },
    selectSection:{
        color:'#fff'
    },
    whiteColor:{
        color:'#fff'
    },
    linkNav:{
        color:"#fff",
        transition:"color 1s",
        '& > *':{
            color:'#fff',
            transition:'color 1s'
        },
        '&:hover > *':{
            color:'#1dd600'
        }
    }
});

const UsualMenu = ()=>{
    const classes = navStyles();
    return(
        <Toolbar>
            <Link className={classes.linkNav} to='/'><img src={logo} className={classes.logo} alt='logo' /></Link>
            <Link className={classes.linkNav} to='/characters'><Button color="inherit">Characters</Button></Link>
            <Link className={classes.linkNav} to='/locations'><Button color="inherit">Locations</Button></Link>
            <Link className={classes.linkNav} to='/episodes'><Button color="inherit">Episodes</Button></Link>
            <Link className={classes.linkNav} to='/search'><Button color="inherit">Search</Button></Link>
        </Toolbar>
    )
}

export default UsualMenu;