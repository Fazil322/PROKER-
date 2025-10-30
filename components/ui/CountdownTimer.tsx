
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { days?: number, hours?: number, minutes?: number, seconds?: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: React.ReactElement[] = [];

  (Object.keys(timeLeft) as Array<keyof typeof timeLeft>).forEach((interval) => {
    if (timeLeft[interval] === undefined) {
      return;
    }
    timerComponents.push(
      <div key={interval} className="text-center">
        <span className="text-2xl sm:text-4xl font-bold text-brand-blue-800 dark:text-white">{String(timeLeft[interval]).padStart(2, '0')}</span>
        <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">{interval}</span>
      </div>
    );
  });
  
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
        {timerComponents.length ? timerComponents : <span className="col-span-4 text-center text-xl font-semibold text-gray-500">Acara telah berlangsung!</span>}
    </div>
  );
};

export default CountdownTimer;
