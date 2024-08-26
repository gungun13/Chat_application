import { Server } from "socket.io";

//making socket server
const io = new Server(5000, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // allow CORS from origin
    },
});

let users=[];
console.log("Initial users:", users);  

const addUser = (userData, socketId) => {
    if (!users.some(user => user.email === userData.email)) {
        users.push({ ...userData, socketId });
        console.log("User added:", { ...userData, socketId });
    } else {
        console.log("User already exists:", userData.email);
    }
    console.log("Current users:", users);  // Log the current users array after adding
};

const getUser = (email) => {
    return users.find(user => user.email === email);
};

io.on("connection",(socket)=>{
    console.log(`user connected,${socket.id}`);

    // add logged users to users array 
    socket.on('addUser',userData=>{  
        addUser(userData,socket.id)
    });

    //handle sending messages for one-to-one chat
    socket.on('sendMessage',(message)=>{
        console.log(message);
        const user = getUser(message.receiverId);
        console.log(user);
        if(user){
            console.log(user.socketId);
            socket.to(user.socketId).emit('receiveMessage',message);
        }
        else{
            console.log("user doesn't exits")
        }
        
    })

    // Join user to a group room
    socket.on('joinGroup', (groupId) => {
        socket.join(groupId);
  });

    //handle sending message for group chats
    socket.on('sendGroupMessage',(message)=>{
        io.to(message.groupId).emit('receiveMessage',message);
    })

    // handle real time group update on ui
    socket.on('groupCreated', (newGroup) => {
    io.emit('groupCreated', newGroup); // Broadcast to all clients
  });

})