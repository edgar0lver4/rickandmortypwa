import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Grid, Typography} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setState,setData} from '../redux/actions/page-action';
import TargetCharacter from './targets/character-target';
import TargetEpisode from './targets/eposide-target';
import TargetLocation from './targets/location-target';

const contentStyle = makeStyles({
    header:{
        display:'flex',
        flexDirection:'column'
    },
    content:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    subContainer:{
        padding:'20px'
    }
})
const Content = (props) =>{
    const classes = contentStyle();
    const dispatch = useDispatch();
    const infoPage = useSelector((store)=>store.pageStore);
    let [page,setPage] = useState(1);

    //Obtain an information from APi, and save in store
    useEffect(async ()=>{
        try{
            const response = await axios.get(props.url);
            dispatch(setState(props.title,response.data.info.pages,response.data.results));
        }catch(error){
            console.error(error);
        }   
    },[props.url]);
    //Pagination control
    const handlePagination = async (e,v)=>{
        setPage(v);
        console.log(`${props.url}?page=${v}`);
        try{
            const response = await axios.get(`${props.url}?page=${v}`);
            dispatch(setData(response.data.results));
        }catch(error){
            console.log(error);
        }
    }

    return(
        <Grid className={classes.header}>
            <Typography align='left' variant='h2'>
                {props.title}
            </Typography>
            <Grid className={classes.subContainer}>
                <Grid className={classes.content} container spacing={3}>
                    {infoPage.data !== null ?
                        infoPage.title === 'Characters' ? infoPage.data.map((obj) => <TargetCharacter key={obj.id} url={obj.url} /> ) : 
                        infoPage.title === 'Episodes' ? infoPage.data.map((obj) => <TargetEpisode key={obj.id} url={obj.url} /> ) : 
                        infoPage.title === 'Locations' ? infoPage.data.map((obj) => <TargetLocation key={obj.id} url={obj.url} /> ) : null 

                        : 'No hay data' 
                    }
                </Grid>
            </Grid>
            {infoPage.pages !== null ? <Pagination count={infoPage.pages} page={page} onChange={handlePagination} /> : null}
        </Grid>
    ) 
}

export default Content;