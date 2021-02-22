import React, { useEffect, useState } from 'react';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UsualMenu from './navbar/usualMenu';
import MobileMenu from './navbar/mobileMenu';

const navStyles = makeStyles({
    navbar:{
        color:'#fff',
        background:'#000000',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding: '10px'
    }
});

const NavBar = () =>{
    const classes = navStyles();
    const [mobile,setMobile] = useState(false);

    useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth < 900
              ? setMobile(true)
              : setMobile(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    },[]);

    return(
        <AppBar className={classes.navbar}>
            {!mobile ? <UsualMenu/> : <MobileMenu/>}
        </AppBar>
    )
}

export default NavBar;