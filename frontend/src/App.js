import Login from './components/Account/Login';
import ChatDialog from './components/chat/ChatDialog';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/chat" element={<ChatDialog/>}/>
    </Routes>
       
    </div>
  );
}

export default App;
