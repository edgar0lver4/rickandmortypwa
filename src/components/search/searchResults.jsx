import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {Grid} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, resetSearch } from '../../redux/actions/search-action';
import TargetCharacter from '../targets/character-target';
import TargetEpisode from '../targets/eposide-target';

const searchStyle = makeStyles({
    targetContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:'15px'
    },
    searchContainer:{
        padding:'20px'
    }
})

const SearchResults = ()=>{
    //Create a constant 
    const classes = searchStyle();

    let {inType,type,textToSearch} = useParams();
    let dispatch = useDispatch();
    let getSearch = useSelector((store)=>store.searchStore);
    let [page,setPage] = useState(1);
    //Function to controlled the pagination
    const getURL = (page = '')=>{
        let url = '';
        if(page === ''){
            if(inType === "1"){
                url = `https://rickandmortyapi.com/api/character/?${type}=${textToSearch}`;
            }else if(inType === "2"){
                url = `https://rickandmortyapi.com/api/episode/?${type}=${textToSearch}`;
            }
        }else{
            if(inType === "1"){
                url = `https://rickandmortyapi.com/api/character/?page=${page}&${type}=${textToSearch}`;
            }else if(inType === "2"){
                url = `https://rickandmortyapi.com/api/episode/?page=${page}&${type}=${textToSearch}`;
            }
        }
        return url;
    }
    const handlePagination = async (e,v)=>{
        setPage(parseInt(v));
        try{
            if(parseInt(v) !== 1){
                let url = getURL(v);
                let results = await axios.get(url);
                dispatch(setSearch(200,results.data.results,results.data.info.pages,inType));
            }else{
                let url = getURL();
                let results = await axios.get(url);
                dispatch(setSearch(200,results.data.results,results.data.info.pages,inType));
            }
        }catch(error){
            dispatch(setSearch(404,null,null,null));
        }
    }
    //When component mount search info
    useEffect(async ()=>{
        let url = getURL();
        try{
            dispatch(resetSearch());
            let results = await axios.get(url);
            console.log(results);
            dispatch(setSearch(200,results.data.results,results.data.info.pages,inType));
            document.title='Rick y Morty | Search - '+textToSearch;
        }catch(error){
            console.log(error);
            dispatch(setSearch(404,null,null,null));
        }
    },[textToSearch,type,inType]);


    return(
        <Grid>
            <h2>Results of {textToSearch} in {inType === "1" ? 'Characters' : 'Episodes'}</h2>
            { getSearch.status === 404 ? 'No results' : null }
            { getSearch.pages !== null ? <Pagination count={getSearch.pages} page={page} onChange={handlePagination} />: null}
            <Grid className={classes.searchContainer}>
                <Grid className={classes.targetContainer} container spacing={3}>
                    { getSearch.status === 200 && inType === "1" ? getSearch.data.map((el)=><TargetCharacter key={el.id} url={el.url}/>) : null }
                    { getSearch.status === 200 && inType === "2" ? getSearch.data.map((el)=><TargetEpisode key={el.id} url={el.url}/>) : null }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchResults;