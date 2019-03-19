import React, { useState } from 'react';
import Dice from './Dice';
import ITeam from '../types/Types';

export default function Game({teams} : { teams: Array<ITeam>}) {
    const [currentTeam, setCurrentTeam] = useState(getRandomTeam);
    const [diceValue, setDiceValue] = useState<number>();
    const [countDownValue, setCountDownValue] = useState<number>(5);
    const [timerValue, setTimerValue] = useState<number>(30);

    function getRandomTeam(): ITeam {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    function setNextTeam(): void {
        const currentTeamIndex = teams.findIndex((team) => team === currentTeam);
        setDiceValue(undefined);
        setCountDownValue(5);
        setTimerValue(30);
        if (currentTeamIndex === (teams.length - 1)) {
            setCurrentTeam(teams[0]);
        } else {
            setCurrentTeam(teams[currentTeamIndex + 1]);
        }
    }

    function countDownToStart(): void {
        countDownValue > 0 ? setTimeout(() => setCountDownValue(countDownValue - 1), 1000) : console.log("Should get words now, and start timer");
    }

    function countDownTimer(): void {
        timerValue > 0 ? setTimeout(() => setTimerValue(timerValue - 1), 1000) : console.log("idk");
    }

    return (
        <div>
            <span>
                {currentTeam.players[0]}
                {currentTeam.players.map((player, i) => {
                    if (i > 0)
                    return ", " + player + " ";
                })} are now.
            </span>
            Dice: {diceValue}<br/>
            {diceValue === 0 || diceValue ? countDownToStart() : <Dice onDiceRolled={(value: number) => setDiceValue(value)} maxDice={3}/>}<br/>
            Timer: {timerValue}<br/>
            {countDownValue > 0 ? countDownValue : countDownTimer()}<br/>
            {timerValue > 0 ? null : <button onClick={() => setNextTeam()}>Next round</button>}
        </div>
    );
}