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
                    if (team.currentPlayer === team.players.length - 1) {
                        return {...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correctWords - diceValue), currentPlayer: 0};
                    } else {
                        return {...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correctWords - diceValue), currentPlayer: prevTeams[teamIndex].currentPlayer + 1};
                    }
                } else {
                    return team;
                }
            });
        });
    }

    const getNamesCurrentTurn = () => {
        return (
            <span className="game-current">
                {currentTeam ? <h2>{"Team " + ((teams.findIndex((team) => team === currentTeam)) + 1)}</h2>: null}
                {currentTeam ? currentTeam.players[currentTeam.currentPlayer] + " is aan de beurt" : null}
            </span>
        );
    }

    const getTeamsSortedByPoints = () => {
        var sortedTeams = teams.slice(0);
        //https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
        sortedTeams.sort((team1, team2) => {
            return team2.points - team1.points;
        });

        sortedTeams.map((team, i) => {
            return (
                <tr key={i} className="game-results-table-row">
                    <td>
                        {team.players[0]}
                    </td>
                    <td>
                        {team.points}
                    </td>
                </tr>
            );
        });
    }
    
    return (
        <div className="game">
            {gameStage === 0 ? 
            <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                <h2 className="game-teams-title">Stel de teams samen!</h2>
                <Team onTeamsCreated={(createdTeams: Array<ITeam>) => doneTeam(createdTeams)}/>
            </div> : null}
            {(gameStage === 1) && currentTeam ?
                <div className="game-dice">
                    {getNamesCurrentTurn()}
                    <h2 className="game-dice-title">Gooi de dobbelsteen!</h2>
                    <Dice onDiceRolled={(value: number) => doneDiceRoll(value)} maxDice={3} />
                </div> : null}
            {gameStage === 2 ?
                <div className="game-countdown">
                    {getNamesCurrentTurn()}
                    <h2 className="game-countdown-title">Je gooide:</h2>
                    <div className="game-countdown-dice">
                        {diceValue}
                    </div>
                    <br/>
                    <h2 className="game-countdown-title">Klaar?</h2>
                    <Countdown doneCountdown={() => doneCountdown()} />
                </div> : null}
            {gameStage === 3 ?
                <div>
                    <Timer doneTimer={() => doneTimer()}/>
                    <div className="game-words">
                        {getNamesCurrentTurn()}
                        <div className="game-words-dice-wrapper">
                            <h2 className="game-words-title">Je gooide:</h2>
                            <div className="game-words-dice">
                                {diceValue}
                            </div>
                        </div>
                        <hr className="game-words-hr"/>
                        <Words getCorrectWords={(amount: number) => {
                            setCorrectWords(amount);
                        }}/>
                        <hr className="game-words-hr"/>
                        <div>
                            Totaal punten: {correctWords - (diceValue !== undefined ? diceValue : 0)}
                        </div>
                    </div>
                </div> : null}
            {gameStage === 4 ?
                <div className="game-results">
                    <h2 className="game-results-title">Puntentotaal</h2>
                    <table className="game-results-table">
                        <tr>
                            <th>
                                Team van
                            </th>
                            <th>
                                Punten
                            </th>
                        </tr>
                        {getTeamsSortedByPoints()}
                    </table>
                    <button onClick={() => setNextTeam()} className="button-style-inverted">Next round</button>
                </div>: null}
        </div>
    );
};

export default Game;