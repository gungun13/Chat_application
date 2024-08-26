import express from 'express';
import { addUser, getUsers} from '../controllers/user_controller.js';
import { addMsg, getMessages } from '../controllers/msg-controller.js';
import { addGroup, addGroupMsg, getGroupMessages, getGroups } from '../controllers/group-controller.js';

const route=express.Router();

route.post('/add',addUser)
route.get('/users',getUsers)
route.post('/addMsg',addMsg)
route.post('/getMsg',getMessages)
route.post('/addGroup',addGroup)
route.get('/getGroups/:userEmail',getGroups)
route.post('/addGroupMsg',addGroupMsg)
route.post('/getGroupMessage',getGroupMessages)

export default route;