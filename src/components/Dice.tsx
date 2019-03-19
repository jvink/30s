import React, { useState } from 'react';

type Props = {
    maxDice: number;
    onDiceRolled: (value: number) => void;
}

export default function Dice({maxDice, onDiceRolled}: Props) {

    return (
        <div>
            <button onClick={() => rollDice(maxDice)}>
                Roll dice!
            </button>
        </div>
    );

    function rollDice(max: number): void {
        onDiceRolled(Math.floor(Math.random() * Math.floor(max)));
    }
}