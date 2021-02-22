export const setData = (data) =>{
    return{
        type:'SET_DATA_DETAIL',
        data:data
    }
}

export const setSchema = (schema)=>{
    return {
        type:'SET_SCHEMA',
        schema:schema
    }
}

export const resetSchema = ()=>{
    return {
        type:'RESET'
    }
}