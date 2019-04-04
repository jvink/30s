import React, { useState } from 'react';
import '../styles/Countdown.scss';

type Props = {
    doneCountdown: () => void;
}

const Countdown = ({doneCountdown}: Props) => {
    const [countdownValue, setCountdownValue] = useState<number>(1);

    const countdownToStart = (): void => {
        countdownValue > 0 ? setTimeout(() => setCountdownValue(countdownValue - 1), 1000) : doneCountdown();
    }

    countdownToStart();

    return (
        <div className="circle-c center-c">
            <div className="count-c">{countdownValue}</div>
            <div className="l-half-c"></div>
            <div className="r-half-c"></div>
        </div>
    );
}

export default Countdown;