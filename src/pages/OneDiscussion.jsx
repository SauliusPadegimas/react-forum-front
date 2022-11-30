import React, { useRef, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';
import Post from '../components/Post';
import PostReply from '../components/PostReply';
let disc = {};

function OneDiscussion() {
  const { topicName, discId } = useParams();
  const { socket } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [replying, setReplying] = useState(null);

  const pageBottomRef = useRef();

  function scrollToBottom() {
    pageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    socket.emit('posts', discId);
    socket.on('posts', (discData, postsData) => {
      disc = discData;
      setPosts(postsData);
      setLoading(false);
    });
  }, [socket, discId]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='fitVH topic__page'>
          <div className='discussion'>
            <div className='discussion__title w70'>{disc.title}</div>
          </div>
          {posts.map((x, ind) => (
            <Post
              key={ind}
              SetReplying={setReplying}
              subject={disc.title}
              post={x}
              scrollToBottom={scrollToBottom}
            ></Post>
          ))}
          <PostReply disc={disc} replying={replying} setReplying={setReplying} />
          <div ref={pageBottomRef}></div>
        </div>
      )}
    </div>
  );
}

export default OneDiscussion;
