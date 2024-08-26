import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../../redux/slices/UserSlice';

const ChatHeader = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const clickedUser = useSelector((state) => state.conversationUser.conversationInfo);
  const groupSelected = useSelector((state) => state.groupSelected.selectedGroupInfo);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(setUserLogout()); // Dispatch the logout action to update Redux state
  };

  let displayName = '';
  let displayPicture = '';

  // Conditionally render based on whether a group or a user is selected
  if (clickedUser) {
    displayName = clickedUser.name;
    displayPicture = clickedUser.picture;
  }
  if (groupSelected) {
    displayName = groupSelected.name;
  } 

  return (
    <div className="bg-gray-200 h-16 flex items-center py-2 px-4 border-b border-gray-200">
      {displayPicture && 
      <img src={displayPicture} alt="Profile Picture" className="w-8 h-8 rounded-full mr-4" />
      }
      <div className="flex-grow">
        <h3 className="text-lg font-medium">{displayName}</h3>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatHeader;

