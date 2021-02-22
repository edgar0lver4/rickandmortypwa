//Intial state with container categories (Characters, Episodes, Location)
let INITIAL_STATE = {
    title: null,
    pages: null,
    data: null
}
//Initial state with detail schema
let INITIAL_STATE_DETAIL = {
    schema:null,
    data:null
}
//Intial state with search
let INITIAL_STATE_SEARCH = {
    status:null,
    data:null,
    pages:null,
    inType:null
}
//Reducer with container categories
export const pageStore = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case 'SET_STATE':
            return {title:action.title, pages: action.pages, data:action.data};
        case 'SET_DATA':
            return {...state,data:action.data};
        default:
            return state;
    }
}
//Reducer with detail schema categories
export const detailStore = (state = INITIAL_STATE_DETAIL,action)=>{
    switch (action.type) {
        case 'SET_DATA_DETAIL':
            return {...state,data:action.data};
        case 'SET_SCHEMA':
            return {...state,schema:action.schema};
        case 'RESET':
            return {schema:null,data:null}
        default:
            return state;
    }
}
//Reducer with search page and component
export const searchStore = (state = INITIAL_STATE_SEARCH,action)=>{
    switch (action.type) {
        case 'SET_SEARCH':
            return {status:action.status,data:action.data,pages:action.pages,inType:action.inType}
        case 'RESET_SEARCH':
            return {status:null,data:null}
        default:
            return state;
    }
}