import React, { useState } from 'react';
import Dice from './Dice';
import Timer from './Timer';
import ITeam from '../types/Types';

export default function Game({teams} : { teams: Array<ITeam>}) {
    const [currentTeam, setCurrentTeam] = useState(getRandomTeam);
    const [diceValue, setDiceValue] = useState<number>();

    function getRandomTeam(): ITeam {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    function setNextTeam(): void {
        const currentTeamIndex = teams.findIndex((team) => team === currentTeam);
        if (currentTeamIndex === (teams.length - 1)) {
            setCurrentTeam(teams[0]);
        } else {
            setCurrentTeam(teams[currentTeamIndex + 1]);
        }
    }

    return (
        <div>
            {currentTeam.players[0]}
            {currentTeam.players.map((player, i) => {
                if (i > 0)
                return ", " + player + " ";
            })}
            are now.
            {diceValue}
            <Dice onDiceRolled={(value: number) => setDiceValue(value)} maxDice={3}/>
            <Timer/>
            <button onClick={() => setNextTeam()}>Next round</button>
        </div>
    );
}