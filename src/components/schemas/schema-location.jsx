import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import TargetCharacter from '../targets/character-target';

const locationStyle = makeStyles({
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
const SchemaLocation = (props) =>{
    const classes = locationStyle();
    const getDetail = useSelector((store)=>store.detailStore);
    return(
        <Grid className={classes.body}>
        {   getDetail.schema === 'location' ?
                <div>
                    <Grid className={classes.header}>
                        <div className={classes.headerRows}><small>Name</small><br/><h2>{props.data.name}</h2></div>
                        <div className={classes.headerRows}><small>Type</small><br/><h2>{props.data.type}</h2></div>
                        <div className={classes.headerRows}><small>Dimension</small><br/><h2>{props.data.dimension}</h2></div>
                    </Grid>
                    <h2>Residents</h2>
                    <Grid className={classes.bodyContainer}>
                        <Grid className={classes.bodyContent} container spacing={3}>
                            {props.data.residents.map((res,i)=><TargetCharacter key={i} url={res} />)}
                        </Grid>
                    </Grid>
                </div>
            :null
        }
        </Grid>
    )
}

export default SchemaLocation;