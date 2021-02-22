import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loadingGif from '../../media/loading.gif';
import {Link} from 'react-router-dom';

const TargetStyle = makeStyles({
    targetContent:{
        display:'flex',
        flexDirection:'row'
    },
    targetBody:{
        paddingLeft:'10px',
        display:'flex',
        flexDirection:'column'
    },
    linkEp:{
        textTransform:'none',
        textDecoration:'none',
        color:'#000',
        transition:'color 1s',
        '&:hover > *':{
            color:'#009cef'
        }
    },
    imgCharater:{
        width:'150px'
    }
})

const TargetCharacter = (props)=>{
    const classes = TargetStyle();
    const [data,setData] = useState([]);
    useEffect(async ()=>{
        try{
            let response = await axios.get(props.url);
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    },[props.url]);
    return(
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
            { data.length != 0 ?
                <Link className={classes.linkEp} to={`/characters-detail/${data.id}`}>
                    <Paper className={classes.targetContent}>
                        <div><img src={data.image} className={classes.imgCharater}/></div>
                        <Grid className={classes.targetBody}>
                            <div><h3>{data.name}</h3></div>
                            <div>Status: {data.status}</div>
                            <div>Location: {data.location.name}</div>
                        </Grid>
                    </Paper>
                </Link>
                : <img src={loadingGif} className={classes.imgCharater}/>
            }   
        </Grid>
    )
}

export default TargetCharacter;