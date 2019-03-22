import React from 'react';

type Props = {
    maxDice: number;
    onDiceRolled: (value: number) => void;
}

const Dice = ({maxDice, onDiceRolled}: Props) => {
    
    const rollDice = (max: number): void => {
        onDiceRolled(Math.floor(Math.random() * Math.floor(max)));
    }

    return (
        <div>
            <button onClick={() => rollDice(maxDice)}>
                Roll dice!
            </button>
        </div>
    );

}

export default Dice;