import React, { useContext, useEffect, useState } from 'react';
import MainContext from './MainContext';

function Timer({ endDate }) {
  const [timeString, setTimeString] = useState('');
  const { timeNow } = useContext(MainContext);

  useEffect(() => {
    let countDownDate = new Date(endDate).getTime();
    var distance = countDownDate - timeNow;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const string = `${!!days ? days.toString().concat('d') : ''} ${
      !!hours ? hours.toString().concat('h') : ''
    } ${!!minutes ? minutes.toString().concat('m') : ''} ${
      !!seconds ? seconds.toString().concat('s') : ''
    }`;
    setTimeString(string);
  }, [timeNow]);
  return <>{timeString}</>;
}

export default Timer;
