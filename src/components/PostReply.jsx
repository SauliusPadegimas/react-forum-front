import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import MainContext from './MainContext';

function PostReply({ disc, replying, setReplying }) {
  const { socket, user } = useContext(MainContext);
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });
  const [postText, setPostText] = useState('');

  const textRef = useRef();

  function sendPost() {
    const secret = localStorage.getItem('secret');
    const replyid = replying ? replying.id : null;
    const postObj = { secret, text: postText, discId: disc.id, replying: replyid };
    socket.emit('savepost', postObj);
  }

  useEffect(() => {
    socket.on('serverError', (data) => setServerResp(data));
    socket.on('savepost', (data) => {
      setReplying(null);
      setPostText('');
      setServerResp(data);
    });
  }, []);

  return (
    <div className='postReply'>
      <div className='postReply__left'>
        <img src={user.image} alt='user avatar' />
      </div>
      <div className='postReply__right'>
        {replying && (
          <blockquote>
            <div className='closeX' onClick={() => setReplying(null)}>
              &times;
            </div>
            <h4>{replying.username} said:</h4>
            <p>{replying.text}</p>
          </blockquote>
        )}
        <textarea
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          className='postReply__area'
          rows='4'
          placeholder='write your reply...'
        ></textarea>
        <button className='btn btn--white' onClick={sendPost}>
          Post reply
        </button>
        {serverResp.error && (
          <div className='server-msg'>
            <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
            <h4 className='heading-quaternary'>{serverResp.message}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostReply;
