import React, { useContext, useEffect, useState } from 'react';
import Menu from './main/Menu';
import ChatBox from './chats/ChatBox';
import { useAuth0 } from '@auth0/auth0-react';
import { apiClient } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/UserSlice';
import { useSelector } from 'react-redux';
import EmptyChat from './chats/EmptyChat';
import { SocketContext } from '../../context/Socket';

const ChatDialog = () => {
  const { user } = useAuth0();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const conversationUser = useSelector((state) => state.conversationUser.conversationInfo);
  const groupSelected = useSelector((state) => state.groupSelected.selectedGroupInfo);
  const socket=useContext(SocketContext)

  // to add new user to database
  useEffect(() => {
    const postUser = async () => {
      try {
        const res = await apiClient.post(process.env.REACT_APP_ADD, user);
        setResponse(res); // response from server when user is added to database
        console.log("response before",response);  //gives null
        dispatch(setUserLogin(user));
        
      } catch (err) {
        setError(err);
      }
    };
    if(user){
    postUser();
    }
  }, [user]);

    // to check response 
    if (response) {
      console.log('Response Data:', response);
      socket.current.emit('addUser',user);
    }

  // Ensure to handle loading state if needed
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
  <div className="w-1/4 bg-white border-r border-gray-200"> 
    <Menu />
  </div>
  <div className="w-3/4">  
  {conversationUser || groupSelected ?<ChatBox/>:<EmptyChat/>}
  </div>
</div>

  );
};

export default ChatDialog;



