import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import MainContext from '../components/MainContext';
let topics = [];

function Topics() {
  const { socket, topic, setTopic } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit('topics');
    socket.on('topics', (data) => {
      topics = data;
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='fitVH topic__page'>
          {topics.map((x, ind) => (
            <Link key={ind} to={`/${x.title}`}>
              <div className='topic' onClick={() => setTopic(x.id)}>
                <div className='topic__title'>{x.title}</div>
                <div className='topic__count'>discussions: {x.length}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topics;
