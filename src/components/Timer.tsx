import React, { useState } from 'react';

export default function Timer() {
    const [time, setTime] = useState<number>(30);

    // time > 0 ? setTimeout(() => setTime(time - 1), 1000) : alert('Game over!');
    
    return (
        <div>
            {time}
        </div>
    );
}