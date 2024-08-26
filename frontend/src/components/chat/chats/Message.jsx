import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const loggedUser = useSelector((state) => state.loginUser.userInfo);

  return (
    <div className="flex flex-col gap-2">
      {loggedUser.email === message.senderId ? (
        <div className="inline-block break-words rounded-lg px-4 py-2 max-w-xs my-0.5 ml-auto mr-16 bg-green-200 font-semibold text-black">
          {message.message}
        </div>
      ) : (
        <>
          {message.receiverId && (
            <div className="inline-block break-words rounded-lg px-4 py-2 max-w-xs my-0.5 ml-16 mr-auto bg-gray-200 font-semibold text-black">
              <span>{message.message}</span>
            </div>
          )}
          {message.groupId && (
            <div className="flex items-center gap-2 ml-16">
              <img className="w-8 h-8 rounded-full" src={message.senderImage} />
              <div className="inline-block break-words rounded-lg px-4 py-2 max-w-xs my-0.5 mr-auto bg-gray-200 font-semibold text-black">
                <span>{message.message}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;


