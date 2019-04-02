import React from 'react';
import '../styles/Game.scss';

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
            <button onClick={() => rollDice(maxDice)} className="game-dice-button dice-grow">
                ?
            </button>
        </div>
    );

}

export default Dice;