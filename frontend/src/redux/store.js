import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from './slices/UserSlice';
import conversationUserReducer from './slices/conversationSlice';
import groupSelectedReducer from './slices/groupSlice';

export const store=configureStore({
    reducer:{
        loginUser:loginUserReducer,
        conversationUser:conversationUserReducer,
        groupSelected:groupSelectedReducer
    }
})