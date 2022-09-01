const initialState={
    toggle:false
}

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'TOGGLE':
            return {toggle:!state.toggle}
        default:
            return state

    }
    
    
}
export default rootReducer;