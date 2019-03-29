import React, { useState } from 'react';
import '../styles/Timer.scss';

type Props = {
    doneTimer: () => void;
}

const Timer = ({doneTimer}: Props) => {
    const [timerValue, setTimerValue] = useState<number>(3);

    const countDownTimer = (): void => {
        timerValue > 0 ? setTimeout(() => setTimerValue(timerValue - 1), 1000) : doneTimer();
    }

    countDownTimer();

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