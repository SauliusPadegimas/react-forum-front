import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import MainContext from './components/MainContext';
import AddDiscussion from './pages/AddDiscussion';
import Discussions from './pages/Discussions';
import Home from './pages/Home';
import Login from './pages/Login';
import OneDiscussion from './pages/OneDiscussion';
import Topics from './pages/Topics';
import User from './pages/User';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState({ username: null });
  const [logedUsers, setLogedUsers] = useState([]);
  const nav = useNavigate();

  const states = {
    socket,
    user,
    setUser,
    fetchUser,
    logedUsers,
    setLogedUsers,
  };

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    if (!data.error) {
      setUser(data.user);
      // socket.emit('logedUsers', data.userId);
    } else {
      console.log('resp from server ===', data);
      nav('/login');
    }
  }

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />}>
          <Route index element={<Topics />} />
          <Route path='/user' element={<User />} />
          <Route path=':topicName' element={<Discussions />} />
          <Route path=':topicName/:discId' element={<OneDiscussion />} />
          <Route path=':topicName/add-discussion' element={<AddDiscussion />} />
        </Route>
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
