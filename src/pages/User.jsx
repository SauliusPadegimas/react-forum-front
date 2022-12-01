import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { FaCircle } from 'react-icons/fa';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';

function User() {
  const { socket, user, fetchUser, logedUsers } = useContext(MainContext);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myPosts, SetMyPosts] = useState(0);
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });

  const imgRef = useRef();

  function sendUrl() {
    const secret = localStorage.getItem('secret');
    socket.emit('updateImage', {
      secret,
      imgUrl: imgRef.current.value,
    });
  }

  useEffect(() => {
    if (user.username) {
      socket.emit('usersPostsNum');
      socket.on('usersPostsNum', (data) => {
        setLeaderBoard(data);
        setLoading(false);
        SetMyPosts(data.find((x) => x.username === user.username).posts);
      });
    }
  }, [user]);

  useEffect(() => {
    socket.on('updateImage', (data) => {
      setServerResp(data);
      const secret = localStorage.getItem('secret');
      fetchUser(secret);
    });
    socket.on('serverError', (data) => setServerResp(data));
  });

  return (
    <div className='user__page fitVH'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='user__panel'>
            <div className='user__left'>
              <img src={user.image} alt='user avatar' />
            </div>
            <div className='user__right input__container'>
              <div className='user__title'>{user.username}</div>
              <label htmlFor='imageUrl' className='label'>
                Update your image
              </label>
              <input
                type='url'
                id='imageUrl'
                ref={imgRef}
                className='user__input input--text '
                placeholder='https://...'
              />
              <button className='btn btn--grey' onClick={sendUrl}>
                Update
              </button>
              <div className='user__score'>Posts: {myPosts}</div>
            </div>
          </div>
          {serverResp.message && (
            <div className='server-msg'>
              {/* jeigu turim klaida is serverio, tai rodom pranešimą */}
              {serverResp.error ? (
                <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
              ) : (
                <AiFillCheckCircle style={{ color: 'green', marginRight: '1rem' }} />
              )}
              <h4 className='heading-quaternary'>{serverResp.message}</h4>
            </div>
          )}
          <div className='leader__board'>
            <div className='user__title'>Users Leader Board</div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Posts</th>
                </tr>
              </thead>
              <tbody>
                {leaderBoard.map((x, ind) => (
                  <tr key={ind}>
                    <td>
                      <FaCircle
                        style={{
                          color: logedUsers.some((obj) => obj.userId === x.id) ? 'green' : 'red',
                          fontSize: '1.2rem',
                        }}
                      />{' '}
                      {x.username}
                    </td>
                    <td>{x.posts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
