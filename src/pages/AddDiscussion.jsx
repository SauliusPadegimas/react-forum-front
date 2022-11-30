import React, { useContext, useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import MainContext from '../components/MainContext';
import { useNavigate, useParams } from 'react-router-dom';

function AddDiscussion() {
  const { topicName } = useParams();
  const [topicId, setTopicId] = useState(null);
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });
  const { socket } = useContext(MainContext);
  const nav = useNavigate();
  const titleRef = useRef();
  const textRef = useRef();

  function sendDiscussion(e) {
    e.preventDefault();
    const secret = localStorage.getItem('secret');
    let topic = '';

    const discObj = {
      topicId: topicId,
      title: titleRef.current.value,
      text: textRef.current.value,
      secret,
    };
    socket.emit('addDisc', discObj);
  }

  useEffect(() => {
    socket.emit('topics', topicName);
    socket.on('oneTopic', (respTopic) => setTopicId(respTopic.id));
    socket.on('serverError', (data) => setServerResp(data));
    socket.on('addDisc', (discid) => nav(`/${topicName}/${discid}`));
  }, []);

  return (
    <div className='fitVH topic__page'>
      <form onSubmit={sendDiscussion}>
        <div className='input__container'>
          <label className='label' htmlFor='discTitle'>
            Topic Title
          </label>
          <input type='text' className='input--text' ref={titleRef} id='discTitle' />
        </div>
        <div className='input__container'>
          <label className='label' htmlFor='discText'>
            Post Text
          </label>
          <textarea
            className='input--text'
            ref={textRef}
            id='discText'
            cols='30'
            rows='5'
          ></textarea>
        </div>
        <input type='submit' className='btn btn--white' value='Submit' />
      </form>
      {/* if we have an error from server, we show alert */}
      {serverResp.error && (
        <div className='server-msg'>
          <AiFillCloseCircle style={{ color: 'red', marginRight: '1rem' }} />
          <h4 className='heading-quaternary'>{serverResp.message}</h4>
        </div>
      )}
    </div>
  );
}

export default AddDiscussion;
