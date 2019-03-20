import React, { useState } from 'react';
import ITeam from '../types/Types';
import Dice from './Dice';
import Words from './Words';
import Countdown from './Countdown';
import Timer from './Timer';

export default function Game({teams} : { teams: Array<ITeam>}) {
    const [currentTeam, setCurrentTeam] = useState(getRandomTeam);
    const [diceValue, setDiceValue] = useState<number>();
    const [gameStage, setGameStage] = useState<number>(0);

    function getRandomTeam(): ITeam {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    function setNextTeam(): void {
        const currentTeamIndex = teams.findIndex((team) => team === currentTeam);
        setDiceValue(undefined);
        setGameStage(0);
        
        if (currentTeamIndex === (teams.length - 1)) {
            setCurrentTeam(teams[0]);
        } else {
            setCurrentTeam(teams[currentTeamIndex + 1]);
        }
    }

    function doneCountdown(): void {
        setGameStage(2);
    }

    function doneTimer(): void {
        setGameStage(3);
    }

    function getNumberOfCorrectWords(): void {
        console.log(getNumberOfCorrectWords);
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
            GameStage: {gameStage}
            {gameStage === 0 ? <Dice onDiceRolled={(value: number) => (setDiceValue(value), setGameStage(1))} maxDice={3}/> : null}
            {gameStage === 1 ? <Countdown doneCountdown={() => doneCountdown()}/> : null}
            {gameStage === 2 ? <div><Timer doneTimer={() => doneTimer()}/><Words getNumberOfCorrectWords={() => getNumberOfCorrectWords()}/></div> : null}
            {/* in the Word component, add a function to get the correct number of answers */}
            {gameStage === 3 ? <button onClick={() => setNextTeam()}>Next round</button> : null}
        </div>
    );
}