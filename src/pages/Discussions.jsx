import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';
let discussions = [];

function Discussions() {
  const { topicName } = useParams();
  const { socket, topic, setDiscussion } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit('discussions', topic);
    console.log('topic ===', topic);
    socket.on('discussions', (data) => {
      discussions = data;
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='fitVH topic__page'>
          <div className='topic'>
            <div className='topic__title'>{topicName}</div>
            <div className='topic__count'>discussions: {discussions.length}</div>
          </div>
          {discussions.map((disc, ind) => {
            <Link key={ind} to={`/${topicName}/${disc.title}`}>
              <div className='discussion' onClick={() => setDiscussion(disc._id)}>
                <div className='discussion__title'>{disc.name}</div>
                {/* <div className='discussion__count'>posts: {disc.posts.length}</div> */}
                <div className='discussion__author'>{disc.author}</div>
              </div>
            </Link>;
          })}
          <Link to={`/${topicName}/add-discussion`}>
            <div className='btn btn--grey'>New Topic</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Discussions;
