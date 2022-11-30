import React, { useContext, useEffect, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import DateToLocal from '../components/Date';
import MainContext from './MainContext';

function Post({ post, subject, SetReplying, scrollToBottom }) {
  const [reply, setReply] = useState(null);
  const { socket } = useContext(MainContext);
  useEffect(() => {
    if (post.replying) {
      socket.emit('post', post.replying);
      socket.on('post', (respPost) => setReply(respPost));
    } else {
      setReply(null);
    }
  }, [post, socket]);
  return (
    <div className='post'>
      <div className='post__left'>
        <div className='left__top'>
          <h2>{post.username}</h2>
        </div>
        <div className='left__bottom'>
          <img src={post.image} alt='user avatar' />
        </div>
      </div>
      <div className='post__right'>
        <div className='right__top'>
          <h2>{subject}</h2>
          <h2>
            <DateToLocal date={post.time} />
          </h2>
        </div>
        <div className='right__bottom'>
          {reply && (
            <blockquote>
              <h4>{reply.username} said:</h4>
              <p>{reply.text}</p>
            </blockquote>
          )}
          <div
            className='reply-icon'
            onClick={() => {
              SetReplying(post);
              scrollToBottom();
            }}
          >
            <FaReply />
          </div>
          <p className='post__text'>{post.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
