import { createSlice } from '@reduxjs/toolkit';

export const conversationSlice = createSlice({
  name: 'conversationUser',
  initialState:{
    conversationInfo: null,
  },
  reducers: {
    setConversation: (state, action) => {
      state.conversationInfo = action.payload;
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
