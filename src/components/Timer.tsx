import React, { useState, useEffect } from 'react';
import '../styles/Timer.scss';

interface Props {
    doneTimer: () => void;
}

const Timer = ({ doneTimer }: Props) => {
    const [timerValue, setTimerValue] = useState<number>(30);

    useEffect(() => {
        countdownTimer();
    }, [timerValue]);

    const countdownTimer = (): void => {
        timerValue > 0 ? setTimeout(() => setTimerValue(timerValue - 1), 1000) : doneTimer();
    }

    return (
        <div className="circle center">
            <div className="count">{timerValue}</div>
            <div className="l-half"></div>
            <div className="r-half"></div>
        </div>
    );
}

export default Timer;