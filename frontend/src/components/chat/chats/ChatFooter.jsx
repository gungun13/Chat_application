import React, { useState } from 'react'

const ChatFooter = ({sendMessage,setMsg,msg}) => {
  
  return (
    <div className="chat-footer fixed bottom-0 w-3/4 mx-auto bg-gray-200 h-16 flex items-center py-2 px-4 border-b border-gray-200">
      <input
        className="chat-input flex-grow rounded-md px-4 py-2 focus:outline-none"
        placeholder="Type a message..."
        onChange={(e) => setMsg(e.target.value)}
        onKeyPress={(e)=>{sendMessage(e)}}
        value={msg}
      />
      <button className="ml-2 text-black hover:text-gray-700" onClick={sendMessage}>Send</button>
      {/* <img className=' md:w-160 lg:w-324 ' src="https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg" alt="image"></img> */}
    </div>
  )
}

export default ChatFooter

