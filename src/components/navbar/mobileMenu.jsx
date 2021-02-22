import React,{useState} from 'react';
import logo from '../../logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

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
    },
    menuContent:{
        display:'flex',
        flexDirection:'column'
    },
    subMenuClassRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    subMenuClassColumn:{
        display:'flex',
        flexDirection:'column'
    }
});

const MobileMenu = ()=>{
    const classes = navStyles();
    //Menu controller
    const [openMenu,setOpenMenu] = useState(false);
    //Toggle function to control menu
    const toggleMenu = ()=>{
        openMenu ? setOpenMenu(false) : setOpenMenu(true);
    }
    return(
        <Toolbar className={classes.menuContent}>
            <Grid className={classes.subMenuClassRow}>
                <Button color="inherit" onClick={()=>toggleMenu()}><MenuIcon /></Button>
                <Link className={classes.linkNav} to='/'><img src={logo} className={classes.logo} alt='logo' /></Link>
            </Grid>
            {
                openMenu ? 
                    <Grid className={classes.subMenuClassColumn}>
                        <Link className={classes.linkNav} to='/characters'><Button color="inherit">Characters</Button></Link>
                        <Link className={classes.linkNav} to='/locations'><Button color="inherit">Locations</Button></Link>
                        <Link className={classes.linkNav} to='/episodes'><Button color="inherit">Episodes</Button></Link>
                        <Link className={classes.linkNav} to='/search'><Button color="inherit">Search</Button></Link>
                    </Grid>
                :null
            } 
        </Toolbar>
    )
}

export default MobileMenu;