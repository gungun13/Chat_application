import React, { useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { groupApiClient } from '../../../services/groupApi';
import { SocketContext } from '../../../context/Socket';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loggedUser = useSelector((state) => state.loginUser.userInfo);
  const socket=useContext(SocketContext);

  const groupNameRef=useRef(null);
  const groupDescRef = useRef(null);
  const groupMemberRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //add group to database
  const addGroup=async()=>{
    console.log("group created")
    const members = groupMemberRef.current.value.split(",").map(member => member.trim());
    const groupInfo={
      name:groupNameRef.current.value,
      description:groupDescRef.current.value,
      members:[loggedUser.email,...members]
    }
    try{
      const res=await groupApiClient.postGroup(process.env.REACT_APP_ADDGROUP,groupInfo)
      console.log("group made is: ",res.data)
      closeModal();
      //emit new group to socket server for real time update group
      socket.current.emit("groupCreated",res.data.group)
    }
    catch(err){
      console.log("error in add group",err)
    }
  }

  return (
    <div>
      <header className="h-16 bg-gray-200 text-white border-b border-gray-400 flex items-center justify-between px-4">
        {loggedUser && (
          <img className="w-10 h-10 ml-2 rounded-full object-cover" src={loggedUser.picture} alt="User Profile" />
        )}
        <button
          onClick={openModal}
          className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-2 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Create Group
        </button>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed flex items-center justify-center bg-black">
          <div className="bg-white rounded-lg shadow-lg p-6 ">
            <h2 className="text-xl font-bold mb-4">Create Group</h2>
            <div>
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2">Group Name</label>
                <input
                ref={groupNameRef}
                  type="text"
                  placeholder="Enter group name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2">Group Description</label>
                <input
                ref={groupDescRef}
                  type="text"
                  placeholder="Enter group description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2">Add Members</label>
                <input
                ref={groupMemberRef}
                  type="text"
                  placeholder="Enter member usernames"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addGroup}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;


