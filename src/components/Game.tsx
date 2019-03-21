import React, { useState, useEffect } from 'react';
import ITeam from '../types/Types';
import Team from './Team';
import Dice from './Dice';
import Words from './Words';
import Countdown from './Countdown';
import Timer from './Timer';

const Game = () => {

    const [teams, setTeams] = useState<Array<ITeam>>([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [diceValue, setDiceValue] = useState<number>();
    const [gameStage, setGameStage] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);

    function getRandomTeam(): ITeam {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    function setNextTeam(): void {
        const currentTeamIndex = teams.findIndex((team) => team === currentTeam);
        setDiceValue(undefined);
        setGameStage(1);

        if (currentTeamIndex === (teams.length - 1)) {
            setCurrentTeam(teams[0]);
        } else {
            setCurrentTeam(teams[currentTeamIndex + 1]);
        }
    }

    function doneCountdown(): void {
        setGameStage(3);
    }

    function doneTimer(): void {
        setGameStage(4);
        // set teams[ currentteam ] to certain points, correctwords - dice
        // setTeams(teams)
    }

    function teamsCreated(teamsp: Array<ITeam>) {
        setTeams(teamsp);
        setGameStage(1);
    }
    
    useEffect(() => {
        setCurrentTeam(getRandomTeam);
    }, [teams]);

    return (
        <div>
            {gameStage === 0 ? <Team onTeamsCreated={(createdTeams: Array<ITeam>) => teamsCreated(createdTeams)}/> : null}
            {gameStage === 1 ?
                <div>
                    {currentTeam ? currentTeam.players.map((player: string, i: number) => {return player}) : null}
                    <Dice onDiceRolled={(value: number) => (setDiceValue(value), setGameStage(2))} maxDice={3} />
                </div> : null}
            {gameStage === 2 ? <Countdown doneCountdown={() => doneCountdown()} /> : null}
            {gameStage === 3 ?
                <div>
                    <Timer doneTimer={() => doneTimer()}/>
                    <Words getCorrectWords={(amount: number) => {
                        setCorrectWords(amount);
                    }}/>
                </div> : null}
            {gameStage === 4 ? <button onClick={() => setNextTeam()}>Next round</button> : null}
        </div>
    );
};

export default Game;