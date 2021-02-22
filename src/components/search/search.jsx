import React, {useEffect, useState} from 'react';
import {
    RadioGroup,
    FormControlLabel, 
    Grid, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField, 
    makeStyles,
    Radio,
    Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Pagination} from '@material-ui/lab';
import { useHistory } from 'react-router';
import portada from './portada.jpg';
import {useDispatch,useSelector} from 'react-redux';
import { setSearch, resetSearch } from '../../redux/actions/search-action';
import axios from 'axios';
import TargetCharacter from '../targets/character-target';
import TargetEpisode from '../targets/eposide-target';

const searchStyle = makeStyles({
    pageContainer:{
        display:'flex',
        flexDirection:'column'
    },
    searchWindow:{
        width:'100%',
        height:'50%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'500px',
        background:"#AFAFAF",
        backgroundImage:`url("${portada}")`,
        backgroundAttachment:'fixed',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    },
    searchWindowStep2:{
        width:'100%',
        height:'50%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'300px',
        background:"#AFAFAF",
        backgroundImage:`url("${portada}")`,
        backgroundAttachment:'fixed',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    },
    searchContainer:{
        padding:'20px',
        background:'#fff'
    },
    formControl:{
        display:'flex',
        flexDirection:'row'
    },
    inputControl:{
        minWidth:'200px'
    }
})
const SearchWindow = ()=>{
    const classes = searchStyle();
    const history = useHistory();
    //State in this component to controll search
    const [type,setType] = useState("1");
    const [option,setOption] = useState("name");
    const [text,setText] = useState("");
    const [isSearch,setIsSearch] = useState(false);
    const [page,setPage] = useState(1);
    //Redux
    let dispatch = useDispatch();
    let getSearch = useSelector((store)=>store.searchStore);
    //Pagination Controller
    const handlePagination = async (e,v)=>{
        setPage(parseInt(v));
        try{
            if(parseInt(v) !== 1){
                let url = getURL(v);
                let results = await axios.get(url);
                dispatch(setSearch(200,results.data.results,results.data.info.pages,type));
            }else{
                let url = getURL();
                let results = await axios.get(url);
                dispatch(setSearch(200,results.data.results,results.data.info.pages,type));
            }
        }catch(error){
            dispatch(setSearch(404,null,null,null));
        }
    }
    //Function to obtain info with API
    const getURL = (page = '')=>{
        let url = '';
        if(page === ''){
            if(type === "1"){
                url = `https://rickandmortyapi.com/api/character/?${option}=${text}`;
            }else if(type === "2"){
                url = `https://rickandmortyapi.com/api/episode/?${option}=${text}`;
            }
        }else{
            if(type === "1"){
                url = `https://rickandmortyapi.com/api/character/?page=${page}&${option}=${text}`;
            }else if(type === "2"){
                url = `https://rickandmortyapi.com/api/episode/?page=${page}&${option}=${text}`;
            }
        }
        return url;
    }
    //Elements controller
    const enterKey = (e)=>{ //Enter key controller
        if (e.key === 'Enter') {
          startSearch();
        }
    }
    const handleType = (e)=>{//Controller type (Character or Episode)
        setType(e.target.value);
    }
    const hendleOption = (e)=>{//Options controller (Name,Specie,etc..)
        setOption(e.target.value);
    }
    const startSearch = async ()=>{//Search function
        let url = getURL();
        dispatch(resetSearch());
        setIsSearch(false);
        try{
            let results = await axios.get(url);
            dispatch(setSearch(200,results.data.results,results.data.info.pages,type));
            setIsSearch(true);
        }catch(error){
            dispatch(setSearch(404,null,null,null));
            setIsSearch(true);
        }
    }
    //Initialize component
    useEffect(()=>{
        dispatch(resetSearch());
        setIsSearch(false);
    },[])
    return(
        <Grid className={classes.pageContainer}>
            <Grid className={isSearch ? classes.searchWindowStep2 : classes.searchWindow}>
                <Grid className={classes.searchContainer}>
                    <FormControl className={classes.formControl}>
                        <Grid>
                            <InputLabel id="typeChange">Search in</InputLabel>
                            <Select
                                labelId="typeChange"
                                id="typeChange"
                                value={type}
                                onChange={handleType}>
                                    <MenuItem selected value="1">Characters</MenuItem>
                                    <MenuItem value="2">Episode</MenuItem>
                            </Select>
                        </Grid>
                        <Grid>
                            <TextField id="searchInput" label="Search" onKeyPress={enterKey} className={classes.inputControl} onKeyUp={(e) => setText(e.target.value)}/>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={()=>startSearch()}>
                            <SearchIcon/>
                        </Button>
                    </FormControl>
                    <Grid>
                        { type === "1" ? 
                            <RadioGroup row aria-label="position" name="position" defaultValue="name" onChange={hendleOption}>
                                <FormControlLabel
                                    value="name"
                                    control={<Radio color="primary" />}
                                    label="Name"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="status"
                                    control={<Radio color="primary" />}
                                    label="Status"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="species"
                                    control={<Radio color="primary" />}
                                    label="Species"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="type"
                                    control={<Radio color="primary" />}
                                    label="Type"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="gender"
                                    control={<Radio color="primary" />}
                                    label="Gender"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                            : type === "2" ? 
                            <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={hendleOption}>
                                <FormControlLabel
                                    value="name"
                                    control={<Radio color="primary" />}
                                    label="Name"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="episode"
                                    control={<Radio color="primary" />}
                                    label="Episode"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                            :null
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                { isSearch ? <h2>Results of {text} in {type === "1" ? 'Characters' : 'Episodes' }</h2> : null }
                { isSearch && getSearch.status === 404 ? 'No results' : null }
                { isSearch && getSearch.pages !== null ? <Pagination count={getSearch.pages} page={page} onChange={handlePagination} />: null}
                <Grid className={classes.searchContainer}>
                    <Grid className={classes.targetContainer} container spacing={3}>
                        { isSearch && getSearch.status === 200 && type === "1" ? getSearch.data.map((el)=><TargetCharacter key={el.id} url={el.url}/>) : null }
                        { isSearch && getSearch.status === 200 && type === "2" ? getSearch.data.map((el)=><TargetEpisode key={el.id} url={el.url}/>) : null }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchWindow;