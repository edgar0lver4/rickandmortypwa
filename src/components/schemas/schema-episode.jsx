import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import TargetCharacter from '../targets/character-target';

const episodeStyle = makeStyles({
    body:{
        display:'flex',
        flexDirection:'column'
    },
    header:{
        padding:'20px',
        display:'flex',
        flexDirection:'row',
        background:'#000',
        color:'#fff'
    },
    headerRows:{
        marginRight:'15px'
    },
    bodyContainer:{
        padding:'20px'
    },
    bodyContent:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    }
}) 
const SchemaEpisode = (props) =>{
    const classes = episodeStyle();
    const getDetail = useSelector((store)=>store.detailStore);
    const [episode,setEpisode] = useState("");
    const [season,setSeason] = useState("");
    useEffect(()=>{
        if(getDetail.schema === 'episode'){
            const epdata = props.data.episode.split('S').join("").split('E');
            setSeason(epdata[0]);
            setEpisode(epdata[1]);
        }
    },[props]);
    return(
        <Grid className={classes.body}>
        {   getDetail.schema === 'episode' ?
                <div>
                    <Grid className={classes.header}>
                        <div className={classes.headerRows}><small>Name</small><br/><h2>{props.data.name}</h2></div>
                        <div className={classes.headerRows}><small>Air date</small><br/><h2>{props.data.air_date}</h2></div>
                        <div className={classes.headerRows}><small>Season</small><br/><h2>{season}</h2></div>
                        <div className={classes.headerRows}><small>Episode</small><br/><h2>{episode}</h2></div>
                    </Grid>
                    <h2>Characters</h2>
                    <Grid className={classes.bodyContainer}>
                        <Grid className={classes.bodyContent} container spacing={3}>
                            {props.data.characters.map((res,i)=><TargetCharacter key={i} url={res} />)}
                        </Grid>
                    </Grid>
                </div>
            :null
        }
        </Grid>
    )
}

export default SchemaEpisode;