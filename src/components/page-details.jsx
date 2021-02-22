import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { setData, setSchema, resetSchema} from '../redux/actions/detail-action';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SchemaCharacter from './schemas/schema-characters';
import SchemaEpisode from './schemas/schema-episode';
import SchemaLocation from './schemas/schema-location';

const detailsStyles = makeStyles({
    root:{
        flexGrow:1,
        display:'flex',
        flexDirection:'column'
    }
});

const PageDetails = (props) =>{
    const clasess = detailsStyles();
    const getDetail = useSelector((store) => store.detailStore);
    const dispatch = useDispatch();
    let {idConserv} = useParams();
    let urlSchema = props.url + idConserv;
    //Load information
    useEffect(async ()=>{
        dispatch(resetSchema());
        try{
        let results = await axios.get(urlSchema);
            //Sending data from url api
            dispatch(setData(results.data));
            //Sending schema
            dispatch(setSchema(props.schema));
        }catch(error){
            console.log(error);
        }
    },[props]);
    return(
        <Grid className={clasess.root}>
            {props.schema === 'character' && getDetail.data !== null ? <SchemaCharacter data={getDetail.data} /> : null }
            {props.schema === 'episode' && getDetail.data !== null ? <SchemaEpisode data={getDetail.data} /> : null }
            {props.schema === 'location' && getDetail.data !== null ? <SchemaLocation data={getDetail.data} /> : null}
        </Grid>
    )
}

export default PageDetails;