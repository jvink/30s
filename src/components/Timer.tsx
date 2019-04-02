import React, { useState, useEffect } from 'react';
import '../styles/Timer.scss';

type Props = {
    doneTimer: () => void;
}

const Timer = ({doneTimer}: Props) => {
    const [timerValue, setTimerValue] = useState<number>(30);

    useEffect(() => {
        countDownTimer();
    }, [timerValue]);

    const countDownTimer = (): void => {
        timerValue > 0 ? setTimeout(() => setTimerValue(timerValue - 1), 1000) : doneTimer();
    }


    return (
        <div>
            <div className="circle center">
                <div className="count">{timerValue}</div>
                <div className="l-half"></div>
                <div className="r-half"></div>
            </div>
        </div>
    );
}

export default Timer;