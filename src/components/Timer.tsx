import React, { useState } from 'react';

type Props = {
    doneTimer: () => void;
}

export default function Timer({doneTimer}: Props) {
    const [timerValue, setTimerValue] = useState<number>(30);

    function countDownTimer(): void {
        timerValue > 0 ? setTimeout(() => setTimerValue(timerValue - 1), 1000) : doneTimer();
    }

    countDownTimer();

    return (
        <div>
            {timerValue}
        </div>
    );
}