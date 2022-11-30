import React, { useContext, useEffect } from 'react';
import MainContext from '../components/MainContext';

function User() {
  const { socket, user } = useContext(MainContext);

  useEffect(() => {}, []);
  return (
    <div className='user__page fitVH'>
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
            className='user__input input--text '
            placeholder='https://...'
          />
          <button className='btn btn--grey'>Update</button>
          <div className='user__score'>Posts: </div>
        </div>
      </div>
      <div className='leader__board'></div>
    </div>
  );
}

export default User;
