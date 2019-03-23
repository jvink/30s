import React, { useState, useEffect } from 'react';
import ITeam from '../types/Types';
import Team from './Team';
import Dice from './Dice';
import Words from './Words';
import Countdown from './Countdown';
import Timer from './Timer';
import '../styles/Game.css';

const Game = () => {
    const [teams, setTeams] = useState<Array<ITeam>>([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [diceValue, setDiceValue] = useState<number>();
    const [gameStage, setGameStage] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);

    const getRandomTeam = (): ITeam => {
        return teams[Math.floor(Math.random() * teams.length)];
    }

    const setNextTeam = (): void => {
        const currentTeamIndex = teams.findIndex((team) => team.players === currentTeam.players);
        setDiceValue(undefined);
        setCorrectWords(0);
        setGameStage(1);

        if (currentTeamIndex === (teams.length - 1)) {
            setCurrentTeam(teams[0]);
        } else {
            setCurrentTeam(teams[currentTeamIndex + 1]);
        }
    }

    useEffect(() => {
        if (!currentTeam) {
            setCurrentTeam(getRandomTeam);
        }
    }, [teams]);

    const doneTeam = (createdTeams: Array<ITeam>): void => {
        setTeams(createdTeams);
        setGameStage(1);
    }

    const doneDiceRoll = (value: number):void => {
        setDiceValue(value);
        setGameStage(2);
    }

    const doneCountdown = (): void => {
        setGameStage(3);
    }

    const doneTimer = (): void => {
        addPoints();
        setGameStage(4);
    }

    const addPoints = ():void => {
        let teamIndex = teams.findIndex((team) => team === currentTeam);
        setTeams(prevTeams => {
            return prevTeams.map((team, tidx) => {
                if((teamIndex === tidx) && diceValue !== undefined) {
                    return {...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correctWords - diceValue)};
                } else {
                    return team;
                }
            });
        });
    }
    
    return (
        <div className="game">
            {gameStage === 0 ? 
            <div>
                <h2 className="game-teams-title">Stel de teams samen!</h2>
                <Team onTeamsCreated={(createdTeams: Array<ITeam>) => doneTeam(createdTeams)}/>
            </div> : null}
            {(gameStage === 1) && currentTeam ?
                <div className="game-dice">
                    <h2 className="game-dice-title">Gooi de dobbelsteen!</h2>
                    {currentTeam ? currentTeam.players.map((player: string, i: number) => {return player}) : null}
                    <Dice onDiceRolled={(value: number) => doneDiceRoll(value)} maxDice={3} />
                </div> : null}
            {gameStage === 2 ?
                <div className="game-countdown">
                    <h2 className="game-countdown-title">Je gooide:</h2>
                    <div className="game-countdown-dice">
                        {diceValue}
                    </div>
                    <br/>
                    <h2 className="game-countdown-title">Ready?</h2>
                    <Countdown doneCountdown={() => doneCountdown()} />
                </div> : null}
            {gameStage === 3 ?
                <div>
                    <Timer doneTimer={() => doneTimer()}/>
                    <div className="game-words">
                        <div className="game-words-dice">
                            {diceValue}
                        </div>
                        <Words getCorrectWords={(amount: number) => {
                            setCorrectWords(amount);
                        }}/>
                        Words Correct: {correctWords} Total: {correctWords - (diceValue !== undefined ? diceValue : 0)}
                    </div>
                </div> : null}
            {gameStage === 4 ?
                <div>
                    {teams.map((team, i) => {
                        return <p key={i}>Team van {team.players[0]}: {team.points}</p>
                    })}
                    <button onClick={() => setNextTeam()}>Next round</button>
                </div>: null}
        </div>
    );
};

export default Game;