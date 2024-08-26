import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:"loginUser",
    initialState:{
        userInfo: null,
        isLoggedIn: false
    },
    reducers:{
        setUserLogin(state,action){
            state.userInfo=action.payload;
            console.log("login user is:",action.payload);
            state.isLoggedIn=true;
        },
        setUserLogout(state,action){
            state.userInfo=null;
            state.isLoggedIn=false;
        }
}
});

export const{setUserLogin,setUserLogout}=UserSlice.actions;
export default UserSlice.reducer;