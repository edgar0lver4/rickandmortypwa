import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from './content';
import PageDetails from './page-details';
import SearchWindow from './search/search';
import SearchResults from './search/searchResults';
import IndexPage from "./index";
const containerStyle = makeStyles({
    container:{
        marginTop:'85px'
    }
});

let Container = () => {
    const classes = containerStyle();
    return(
        <Grid className={classes.container}>
            <Switch>
                <Route path='/' exact>
                    <IndexPage/>
                </Route>
                <Route path='/characters'>
                    <Content title='Characters' url='https://rickandmortyapi.com/api/character'/>
                </Route>
                <Route path='/locations' exact>
                    <Content title='Locations' url='https://rickandmortyapi.com/api/location'/>
                </Route>
                <Route path='/episodes' exact>
                    <Content title='Episodes' url='https://rickandmortyapi.com/api/episode'/>
                </Route>
                <Route path='/search'>
                    <SearchWindow/>
                </Route>
                <Route path={`/search-results/:inType/:type/:textToSearch`}>
                    <SearchResults/>
                </Route>
                <Route path={`/characters-detail/:idConserv`}>
                    <PageDetails url='https://rickandmortyapi.com/api/character/' schema='character'/>
                </Route>
                <Route path={`/episode-detail/:idConserv`}>
                    <PageDetails url='https://rickandmortyapi.com/api/episode/' schema='episode'/>
                </Route>
                <Route path={`/location-detail/:idConserv`}>
                    <PageDetails url='https://rickandmortyapi.com/api/location/' schema='location'/>
                </Route>
            </Switch>
        </Grid>
    );
};

export default Container;