import React, {useState} from 'react';
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
import { useHistory } from 'react-router';
import portada from './portada.jpg';

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
        minHeight:'300px',
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
const SearchComponent = ()=>{
    const classes = searchStyle();
    const history = useHistory();
    const [type,setType] = useState("1");
    const [option,setOption] = useState("name");
    const [text,setText] = useState("");
    const handleType = (e)=>{
        setType(e.target.value);
    }
    const hendleOption = (e)=>{
        setOption(e.target.value);
    }
    const enterKey = (e)=>{
        if (e.key === 'Enter') {
          startSearch();
        }
    }
    const startSearch = async ()=>{
        let url = ''
        if(type === "1"){
            url=`/search-results/${type}/${option}/${text}`;
        }else if(type === "2"){
            url=`/search-results/${type}/${option}/${text}`;
        }
        history.push(url)
    }
    return(
        <Grid className={classes.pageContainer}>
            <Grid className={classes.searchWindow}>
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
        </Grid>
    )
}

export default SearchComponent;