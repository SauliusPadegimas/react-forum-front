import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DateToLocal from '../components/Date';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';
let discussions = [];

function Discussions() {
  const { topicName } = useParams();
  const { socket } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit('discussions', topicName);
    socket.on('discussions', (data) => {
      discussions = data;
      console.log('discussions ===', discussions);
      setLoading(false);
    });
  }, [socket, topicName]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='fitVH topic__page'>
          <div className='topic'>
            <div className='w70'>
              <div className='topic__title'>{topicName}</div>
              <div className='topic__count'>discussions: {discussions.length}</div>
            </div>
            <div className='w15'>
              <h3>Author</h3>
            </div>
            <div className='w15'>
              <h3>Last Post</h3>
            </div>
          </div>
          {discussions.map((disc, ind) => (
            <Link key={ind} to={`/${topicName}/${disc.id}`}>
              <div className='discussion'>
                <div className='discussion__title w70'>{disc.title}</div>
                <div className='discussion__spec w15'>
                  <h3 className='author__name'>{disc.username}</h3>
                </div>
                <div className='discussion__spec w15'>
                  <h3 className='author__name'>
                    <DateToLocal date={disc.lastPost} />{' '}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
          <Link to={`/${topicName}/add-discussion`}>
            <div className='btn btn--grey mt-1'>New Topic</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Discussions;
