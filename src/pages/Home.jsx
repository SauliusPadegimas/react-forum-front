import React, { useContext, useEffect } from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import MainContext from '../components/MainContext';

function Home() {
  const { user, socket, fetchUser, setLogedUsers } = useContext(MainContext);

  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    socket.emit('forceDisconnect', 'logout');
    window.location.reload(false);
  }

  useEffect(() => {
    const secret = localStorage.getItem('secret');
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
  }, []);

  useEffect(() => {
    socket.on('logedUsers', (arr) => setLogedUsers(arr));
  }, []);

  return (
    <div>
      <header className='header'>
        <div className='container header__content'>
          <div className='header__side header__side--left'>
            <Link to='/'>
              <div className='btn btn--white'>
                <AiFillHome className='icon icon--home' />
                <div className='header__title'>Type12 Grupės forumas</div>
              </div>
            </Link>
          </div>
          <div className='header__side header__side--right'>
            <Link to='/user'>
              <div className='header__profile'>
                <BsFillPersonFill className='icon icon--profile' /> {user.username}
              </div>{' '}
            </Link>
            <div className='btn btn--shadow btn--grey' onClick={logoutUser}>
              <AiOutlineLogout className='icon icon--logout' /> Logout
            </div>
            <></>
          </div>
        </div>
      </header>
      <div className='container'>
        <BreadCrumbs />
        <Outlet />
      </div>
      <footer className='footer'>Saulius Padegimas &copy; 2022</footer>
    </div>
  );
}

export default Home;
