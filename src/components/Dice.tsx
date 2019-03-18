import React, { useState } from 'react';

type Props = {
    maxDice: number
}

export default function Dice({maxDice}: Props) {
    const [diceValue, setDice] = useState<number>();

    return (
        <div>
            {diceValue}
            <button onClick={() => setDice(rollDice(maxDice))}>
                Roll dice!
            </button>
        </div>
    );

    function rollDice(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}