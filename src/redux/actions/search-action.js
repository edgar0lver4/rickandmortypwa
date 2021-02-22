export const setSearch = (status,data,pages,inType)=>{
    return{
        type:'SET_SEARCH',
        status:status,
        data:data,
        pages:pages,
        inType:inType
    }
}
export const resetSearch = ()=>{
    return {
        type:'RESET_SEARCH'
    }
}