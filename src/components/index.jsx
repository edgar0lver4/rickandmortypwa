import { Grid } from '@material-ui/core';
import React from 'react';
import SearchComponent from './search/searchComponent';
import CarouselComponent from './carousel';
const IndexPage = ()=>{
    return(
        <Grid>
            <SearchComponent/>
            <CarouselComponent type='character' title='New Characters' url='https://rickandmortyapi.com/api/character/'/>
            <CarouselComponent type='episode' title='New Episodes' url='https://rickandmortyapi.com/api/episode/'/>
        </Grid>
    )
}

export default IndexPage;