import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TargetCharacter from './targets/character-target';
import TargetEpisode from './targets/eposide-target';
const carrouselStyles = makeStyles({
    carrouselBody:{
        display:'flex',
        flexDirection:'column'
    },
    carrouselPadding:{
        padding:'20px'
    },
    carrouselContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        flexGrow:1
    }
});

const CarouselComponent = (props)=>{
    const classes = carrouselStyles();
    const [data,setData] = useState([]);

    const getNews = (max)=>{
        let res = max - 11;
        let ids = [];
        for(let i = res; i <= max; i++){
            ids.push(i);
        }
        return ids.sort((a,b)=>b-a).join(",");
    }
    useEffect(async ()=>{
        setData([]);
        try{
            let res = await axios.get(props.url);
            let ids = getNews(res.data.info.count);
            let results = await axios.get(props.url+ids);
            setData(results.data);
        }catch(error){
            console.log(error);
        }
    },[props]);
    return(
        <Grid className={classes.carrouselBody}>
            <Typography>
                <h2>{props.title}</h2>
            </Typography>
            <Grid className={classes.carrouselPadding}>
                <Grid className={classes.carrouselContainer} container spacing={3}>
                    { props.type === 'character' && data.length !== 0 ? data.map((el) => <TargetCharacter key={el.id} url={el.url}/> ) : null}
                    { props.type === 'episode' && data.length !== 0 ? data.map((el) => <TargetEpisode key={el.id} url={el.url}/> ) : null}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CarouselComponent;