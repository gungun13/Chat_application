import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatFooter from './ChatFooter';
import { useSelector } from 'react-redux';
import { msgApiClient } from '../../../services/msgApi';
import Message from './Message';
import { SocketContext } from '../../../context/Socket';

const ChatMessage = () => {
  const socket = useContext(SocketContext);
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const loggedUser = useSelector((state) => state.loginUser.userInfo);
  const conversationUser = useSelector((state) => state.conversationUser.conversationInfo);
  const groupSelected = useSelector((state) => state.groupSelected.selectedGroupInfo);
  const [incomingMessage, setIncomingMesssage] = useState(null);
  const chatContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("Received message:", message);
  
      if (message.groupId) {
        console.log("group id is",message.groupId);
        if (groupSelected && message.groupId === groupSelected._id) {
          console.log("Group message for selected group");
          setIncomingMesssage({ ...message });
        } else {
          console.log("group seleted is wrong");
          setIncomingMesssage(null);
        }
      } 
      else if (message.receiverId) {
        console.log("sender id is", message.senderId);
        if (conversationUser && message.senderId === conversationUser.email) {
          console.log("Personal message for logged user");
          setIncomingMesssage({ ...message });
        } else {
          setIncomingMesssage(null);
        }
      }
      else {
        console.log("Null situation, message receiver ID is", message.receiverId || message.groupId);
        setIncomingMesssage(null);
      }
    };
  
    socket.current.on('receiveMessage', handleReceiveMessage);
  }, [groupSelected, conversationUser, socket]);
  
  
  // Automatically scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [msgList]);

  // Join group room when a group is selected
  useEffect(() => {
    if (groupSelected) {
      socket.current.emit('joinGroup', groupSelected._id);
    }
  }, [groupSelected]);

  
  // Fetch messages from the database
  useEffect(() => {
    const getMessages = async (url, data) => {
      try {
        const res = await msgApiClient.getMsg(url, data);
        // console.log("messages are ", res);
        setMsgList(res);
      } catch (err) {
        console.log("Error in msgList", err);
      }
    };

    if (loggedUser) {
      if (conversationUser) {
        const data = {
          senderId: loggedUser.email,
          receiverId: conversationUser.email,
        };
        getMessages(process.env.REACT_APP_GETMSG, data);
      } else if (groupSelected) {
        const data = {
          groupId: groupSelected._id,
        };
        getMessages(process.env.REACT_APP_GETGROUPMSG, data); 
      }
    }
  }, [loggedUser, conversationUser, groupSelected, newMessage]);

  // Add new incoming message to previous messages
  useEffect(() => {
    if (incomingMessage!=null) {
      setMsgList((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage]);

  
  // Save message to database 
  const sendMessage = async (e) => {
    const key = e.key;
    if (key === 'Enter' || e.type === 'click') {
      let message;

      if (groupSelected) {
        message = {
          senderId: loggedUser.email,
          groupId: groupSelected._id,
          message: msg,
          senderImage: loggedUser.picture,
        };

        // Emit message for group
        socket.current.emit('sendGroupMessage', message);

        try {
          // API call to add group message
          const res = await msgApiClient.postMsg(process.env.REACT_APP_ADDGROUPMSG, message);
          setMsg('');
          setNewMessage((prev) => !prev);  // Update UI after sending the message
        } catch (err) {
          console.log("Error in adding group message", err);
        }
      } else if (conversationUser) {
        message = {
          senderId: loggedUser.email,
          receiverId: conversationUser.email,
          message: msg,
        };

        // Emit message for individual user
        socket.current.emit('sendMessage', message);

        try {
          // API call to add user message
          const res = await msgApiClient.postMsg(process.env.REACT_APP_ADDMSG, message);
          setMsg('');
          setNewMessage((prev) => !prev);  // Update UI after sending the message
        } catch (err) {
          console.log("Error in adding message", err);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div
          className="bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] bg-cover h-screen opacity-75 flex-grow overflow-y-auto p-4"
          ref={chatContainerRef}
        >
          {msgList && msgList.map((message, index) => (
            <div key={index} className="message mb-2">
              <Message message={message} />
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>
        <div className="chat-footer h-16">
          <ChatFooter sendMessage={sendMessage} setMsg={setMsg} msg={msg} />
        </div>
      </div>
    </>
  );
};

export default ChatMessage;

 


