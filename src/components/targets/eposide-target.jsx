import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loadingGif from '../../media/loading.gif';
import {Link} from 'react-router-dom';

const TargetStyle = makeStyles({
    targetBody:{
        padding:'10px',
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
        width:'100px'
    }
})

const TargetEpisode = (props)=>{
    const classes = TargetStyle();
    const [data,setData] = useState([]);
    useEffect(async ()=>{
        let response = await axios.get(props.url);
        setData(response.data);
    },[props.url]);
    return(
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
            { data.length != 0 ?
                <Link className={classes.linkEp} to={`/episode-detail/${data.id}`}>
                    <Paper className={classes.targetBody}>
                        <div><h3>EP:{data.id} - {data.name}</h3></div>
                        <div>{data.air_date}</div>
                    </Paper>
                </Link>
                : <img src={loadingGif} className={classes.imgCharater} />
            }   
        </Grid>
    )
}

export default TargetEpisode;