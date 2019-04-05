import React from 'react';
import ITeam from '../types/Types';
import '../styles/Game.scss';
import CurrentTeam from './CurrentTeam';

interface Props {
    currentTeam: ITeam;
    teams: Array<ITeam>;
    onDiceRolled: (value: number) => void;
    maxDice: number;
}

const Dice = ({ currentTeam, teams, maxDice, onDiceRolled }: Props) => {

    const rollDice = (max: number): void => {
        onDiceRolled(Math.floor(Math.random() * Math.floor(max)));
    }

    return (
        <div className="game-dice">
            <h2 className="game-dice-title">Gooi de dobbelsteen!</h2>
            <CurrentTeam currentTeam={currentTeam} teams={teams} />
            <button onClick={() => rollDice(maxDice)} className="game-dice-button dice-grow">
                ?
            </button>
        </div>
    );

}

export default Dice;