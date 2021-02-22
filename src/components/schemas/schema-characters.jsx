import React, { useEffect } from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import TargetEpisode from '../targets/eposide-target';
import {useSelector} from 'react-redux';

const schemaStyle = makeStyles({
    header:{
        display:'flex',
        flexDirection:'column'
    },
    headerContainer:{
        background:'#000',
        color:'#fff',
        display:'flex',
        flexDirection:'row'
    },
    bodyContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:'15px'
    },
    episodeContainer:{
        padding:'20px'
    },
    headerInfo:{
        display:'flex',
        flexDirection:'column',
        marginLeft:'15px'
    },
    linkLocation:{
        color:'#00d2ef',
        textDecoration:'none',
        transition:'color 1s',
        '&:hover':{
            color:'#fff'
        }
    },
    imgCharacters:{
        borderTopLeftRadius:'5px',
        borderBottomLeftRadius:'5px',
        width:'200px'
    }
})

const SchemaCharacter = (props)=>{
    const classes = schemaStyle();
    const getId = (val) =>{
        return val.split('/')[val.split('/').length-1];
    }
    const getDetail = useSelector((store) => store.detailStore);

    useEffect(()=>{
        document.title='Rick y Morty | Character - '+props.data.name;
    },[props.data.name])

    return(
        <Grid className={classes.header}>
            { getDetail.schema === 'character' ?
                <div>
                    <Grid className={classes.headerContainer}>
                        <div><img src={props.data.image} className={classes.imgCharacters} /></div>
                        <Grid className={classes.headerInfo}>
                            <div><h2>Name: {props.data.name}</h2></div>
                            <div>Specie: {props.data.species}</div>
                            <div>Gender: {props.data.gender}</div>
                            <div>Status: {props.data.status}</div>
                            <div>Birthplace: {props.data.origin.name !== 'unknown' ? <Link className={classes.linkLocation} to={`/location-detail/${getId(props.data.origin.url)}`}>{props.data.origin.name}</Link> : props.data.origin.name}</div>
                            <div>Actual Location: <Link className={classes.linkLocation} to={`/location-detail/${getId(props.data.location.url)}`}>{props.data.location.name}</Link></div>
                        </Grid>
                    </Grid>
                    <Grid className={classes.episodeContainer}>
                        <Grid className={classes.bodyContainer} container spacing={3}>
                            {props.data.episode.map((ep,i)=><TargetEpisode key={i} url={ep}/>)}
                        </Grid>
                    </Grid>
                </div>
                : null
            }
        </Grid>
    )
}

export default SchemaCharacter;