import React, { useState, useEffect } from 'react';
import Header from './Header';
import { apiClient } from '../../../services/userApi';
import { groupApiClient } from '../../../services/groupApi';
import { useDispatch, useSelector } from 'react-redux';
import { setConversation } from '../../../redux/slices/conversationSlice';
import { setSelectedGroup } from '../../../redux/slices/groupSlice';
import { SocketContext } from '../../../context/Socket';
import { useContext } from 'react';

const Menu = () => {
  const [users, setUsers] = useState([]);
  const[groups,setGroups] = useState([]);
  const socket = useContext(SocketContext);
  const dispatch=useDispatch();
  const loggedUser=useSelector((state)=>state.loginUser.userInfo);
  const conversationUser = useSelector((state) => state.conversationUser.conversationInfo);
  const groupSelected = useSelector((state) => state.groupSelected.selectedGroupInfo);

  // to fetch users from database
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await apiClient.get(process.env.REACT_APP_GETUSERS);
        setUsers(res.data);
        // if (socket.current.connected) {
        //   res.data.forEach(user => {
        //     socket.current.emit('addUser', user);
        //   });
        // }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    getUsers();
  }, []); // Use an empty dependency array to run once on mount

 
 // to emit loginuser to socket server
  useEffect(() => {
    console.log("logged user is:",loggedUser);
    if (loggedUser && socket.current.connected) {
      console.log("logged user:",loggedUser);
      socket.current.emit('addUser', loggedUser);
      
    }

  },[loggedUser, socket.current.connected]);

 
  //to fetch all groups which the user has joined
  useEffect(()=>{
    const getGroups=async()=>{
      if(loggedUser){
      try{
      const res=await groupApiClient.getGroups(`${process.env.REACT_APP_GETGROUP}/${loggedUser.email}`);
      setGroups(res.data);
      console.log("group data is ",res.data);
      }
      catch(err){
        console.log(err);
      }
    }
  }
    getGroups();
  },[loggedUser])

 
  // to append group name in list if the logged user exists in newgroup members 
  useEffect(() => {
    socket.current.on('groupCreated', (newGroup) => {
      // Check if the logged-in user is a member of the new group
      
      if (loggedUser && newGroup.members.includes(loggedUser.email)) {
        setGroups([...groups, newGroup]);
      }
    
    });
  }, [loggedUser, groups, socket]);
  
  
  //to set conversation user to conversationSlice
  const getUser=(user)=>{
    dispatch(setSelectedGroup(null));
    dispatch(setConversation(user))
  }

  //to set selected group to group slice
  const getGroup=(group)=>{
    dispatch(setConversation(null));
    dispatch(setSelectedGroup(group));
  }

  if (!loggedUser) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="h-full overflow-auto border-r border-gray-400">
      <Header />
      <div className="mt-2">
        {users.map((user) => (
          user.email !== loggedUser.email &&
          <div onClick={() => getUser(user)} className={`flex items-center py-4 px-6 hover:bg-gray-100 border-b border-gray-400
              ${conversationUser?.email === user.email ? 'bg-gray-200' : '' }`} >
            {user.picture && (
              <img className="w-8 h-8 mr-6 rounded-full object-cover" src={user.picture} alt={user.name} />
            ) }
            <p className="font-medium text-lg">{user.name}</p>
          </div>
        ))}
        {groups.map((group) => (
          <div onClick={()=>getGroup(group)} className={`flex items-center py-4 px-6 hover:bg-gray-100 rounded-lg border-b border-gray-400
            ${groupSelected?._id===group._id ? 'bg-gray-200' : '' }`} >
            <p className="font-medium text-lg">{group.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

