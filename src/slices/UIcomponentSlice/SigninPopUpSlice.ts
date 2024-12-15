import { createSlice } from "@reduxjs/toolkit"

type initialState ={ 
    value:boolean
}

const initialState={
    value:false
} as initialState

export const loginStatus = createSlice({
    name:"loginStatus",
    initialState,
    reducers:{
        changeStatusLogin: (state) => {
            state.value = !state.value;
        },
        
    }
})

export const {changeStatusLogin} = loginStatus.actions
export default loginStatus.reducer