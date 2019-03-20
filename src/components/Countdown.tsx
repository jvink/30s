import React, { useState } from 'react';

type Props = {
    doneCountdown: () => void;
}

export default function Countdown({doneCountdown}: Props) {
    const [countdownValue, setCountdownValue] = useState<number>(5);

    function countdownToStart(): void {
        countdownValue > 0 ? setTimeout(() => setCountdownValue(countdownValue - 1), 1000) : doneCountdown();
    }

    countdownToStart();

    return (
        <div>
            {countdownValue}
        </div>
    );
}