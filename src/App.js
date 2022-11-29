import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import MainContext from './components/MainContext';
import AddDiscussion from './pages/AddDiscussion';
import Discussions from './pages/Discussions';
import Home from './pages/Home';
import Login from './pages/Login';
import Topics from './pages/Topics';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState(null);
  const [discussion, setDiscussion] = useState(null);
  const [room, setRoom] = useState('');

  const states = {
    socket,
    user,
    setUser,
    topic,
    setTopic,
    discussion,
    setDiscussion,
    room,
    setRoom,
  };

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />}>
          <Route index element={<Topics />} />
          <Route path=':topicName' element={<Discussions />} />
          <Route path=':topicName/add-discussion' element={<AddDiscussion />} />
        </Route>
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
