import { createSlice } from "@reduxjs/toolkit"

type initialState ={ 
    value:boolean
}

const initialState={
    value:false
} as initialState

export const cartUiStatus = createSlice({
    name:"cartUiStatus",
    initialState,
    reducers:{
        changeStatus: (state) => {
            state.value = !state.value;
        },
        
    }
})

export const {changeStatus} = cartUiStatus.actions
export default cartUiStatus.reducer