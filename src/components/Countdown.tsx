import React, { useState } from 'react';

type Props = {
    doneCountdown: () => void;
}

const Countdown = ({doneCountdown}: Props) => {
    const [countdownValue, setCountdownValue] = useState<number>(5);

    const countdownToStart = (): void => {
        countdownValue > 0 ? setTimeout(() => setCountdownValue(countdownValue - 1), 1000) : doneCountdown();
    }

    countdownToStart();

    return (
        <div>
            {countdownValue}
        </div>
    );
}

export default Countdown;