import React, { useContext, useEffect } from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import MainContext from '../components/MainContext';

function Home() {
  const { user, setUser } = useContext(MainContext);
  const { topicName } = useParams();

  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    nav('/login');
  }

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    if (!data.error) {
      setUser(data.user);
    } else {
      console.log('resp from server ===', data);
      nav('/login');
    }
  }

  useEffect(() => {
    const secret = localStorage.getItem('secret');
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
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
            <div className='header__profile'>
              <BsFillPersonFill className='icon icon--profile' /> {user.username}
            </div>
            <div className='btn btn--shadow btn--grey' onClick={logoutUser}>
              <AiOutlineLogout className='icon icon--logout' /> Logout
            </div>
            <></>
          </div>
        </div>
      </header>
      <div className='container'>
        <Outlet />
      </div>
      <footer className='footer'>Saulius Padegimas &copy; 2022</footer>
    </div>
  );
}

export default Home;
