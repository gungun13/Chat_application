import { createSlice } from "@reduxjs/toolkit";

export const groupSlice=createSlice({
    name:'groupSelected',
    initialState:{
        selectedGroupInfo:null,
    },
    reducers:{
        setSelectedGroup:(state,action)=>{
            state.selectedGroupInfo=action.payload;
        }
    }
});

export const {setSelectedGroup}=groupSlice.actions;
export default groupSlice.reducer;