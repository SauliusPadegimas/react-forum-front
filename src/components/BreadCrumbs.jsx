import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainContext from './MainContext';

function BreadCrumbs() {
  const { topicName, discId } = useParams();
  const { socket } = useContext(MainContext);
  const [discName, setDiscName] = useState('');

  useEffect(() => {
    if (discId) {
      socket.emit('getDiscussion', discId);
    }
    socket.on('getDiscussion', (disc) => {
      setDiscName(disc.title);
    });
  }, [discId]);
  return (
    <ul className='breadcrumb'>
      <li>
        <Link to='/'>Board index</Link>
      </li>
      {topicName && (
        <li>
          <Link to={`/${topicName}`}>{topicName}</Link>
        </li>
      )}
      {discId && (
        <li>
          <Link to={`/${topicName}/${discId}`}>{discName}</Link>
        </li>
      )}
    </ul>
  );
}

export default BreadCrumbs;
