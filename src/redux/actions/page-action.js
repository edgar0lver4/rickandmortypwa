export const setState = (title,pages,data)=>{
    return {
        type:'SET_STATE',
        title:title,
        pages:pages,
        data:data
    }
}

export const setData = (data) =>{
    return {
        type:'SET_DATA',
        data:data
    }
}