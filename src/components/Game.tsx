import React, { useState, useEffect } from 'react';
import ITeam from '../types/Types';
import Team from './Team';
import Dice from './Dice';
import Words from './Words';
import Countdown from './Countdown';
import Timer from './Timer';
import Win from './Win';
import TrophyIcon from 'mdi-react/TrophyIcon';
import '../styles/Game.scss';

const Game = () => {
    const [teams, setTeams] = useState<Array<ITeam>>([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [diceValue, setDiceValue] = useState<number>();
    const [gameStage, setGameStage] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);
    const [winPointsValue, setWinPointsValue] = useState<number>();
    const [gameOver, setGameOver] = useState<ITeam>();

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
        if (winPointsValue) {
            teams.map((team) => {
                if (team.points === winPointsValue || team.points > winPointsValue) {
                    setGameOver(team);
                }
            })
        }
    }, [teams]);

    const doneTeam = (createdTeams: Array<ITeam>, winPoints: number): void => {
        setWinPointsValue(winPoints);
        setTeams(createdTeams);
        setGameStage(1);
    }

    const doneDiceRoll = (value: number): void => {
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

    const addPoints = (): void => {
        let teamIndex = teams.findIndex((team) => team === currentTeam);
        setTeams(prevTeams => {
            return prevTeams.map((team, tidx) => {
                if ((teamIndex === tidx) && diceValue !== undefined) {
                    if (team.currentPlayer === team.players.length - 1) {
                        return { ...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correctWords - diceValue), currentPlayer: 0 };
                    } else {
                        return { ...prevTeams[teamIndex], points: prevTeams[teamIndex].points + (correctWords - diceValue), currentPlayer: prevTeams[teamIndex].currentPlayer + 1 };
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
                {currentTeam ? <h2>{"Team " + ((teams.findIndex((team) => team === currentTeam)) + 1)}</h2> : null}
                {currentTeam ? currentTeam.players[currentTeam.currentPlayer] + " is aan de beurt" : null}
            </span>
        );
    }

    const getTeamsSortedByPoints = () => {
        var sortedTeams = teams.slice(0);
        sortedTeams.sort((team1, team2) => {
            return team2.points - team1.points;
        });

        return sortedTeams.map((team, i) => {
            return (
                <tr key={i} className="game-results-table-row">
                    <td>
                        {i === 0 ? <TrophyIcon color="#e1b12c" /> : null}
                        {i === 1 ? <TrophyIcon color="#bdc3c7" /> : null}
                        {i === 2 ? <TrophyIcon color="#cd7f32" /> : null}
                    </td>
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
            {gameStage === 0 && !gameOver ?
                <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <h2 className="game-teams-title">Stel de teams samen!</h2>
                    <Team onTeamsCreated={(createdTeams: Array<ITeam>, winPoints: number) => doneTeam(createdTeams, winPoints)} />
                </div> : null}
            {(gameStage === 1 && !gameOver) && currentTeam ?
                <div className="game-dice">
                    <h2 className="game-dice-title">Gooi de dobbelsteen!</h2>
                    {getNamesCurrentTurn()}
                    <Dice onDiceRolled={(value: number) => doneDiceRoll(value)} maxDice={3} />
                </div> : null}
            {gameStage === 2 && !gameOver ?
                <div className="game-countdown">
                    {getNamesCurrentTurn()}
                    <h2 className="game-countdown-title">Je gooide:</h2>
                    <div className="game-countdown-dice">
                        {diceValue}
                    </div>
                    <br />
                    <h2 className="game-countdown-title">Klaar?</h2>
                    <Countdown doneCountdown={() => doneCountdown()} />
                </div> : null}
            {gameStage === 3 && !gameOver ?
                <div className="game-words-wrapper">
                    <Timer doneTimer={() => doneTimer()} />
                    <div className="game-words">
                        <div className="game-words-title-dice-wrapper">
                            {getNamesCurrentTurn()}
                            <div className="game-words-dice-wrapper">
                                <h2 className="game-words-title">Je gooide:</h2>
                                <div className="game-words-dice">
                                    {diceValue}
                                </div>
                            </div>
                        </div>
                        <hr className="game-words-hr" />
                        <Words getCorrectWords={(amount: number) => {
                            setCorrectWords(amount);
                        }} />
                        <hr className="game-words-hr" />
                        <div className="game-words-result">
                            Totaal punten: <span className="game-words-result-value">{correctWords - (diceValue !== undefined ? diceValue : 0)}</span>
                        </div>
                    </div>
                </div> : null}
            {gameStage === 4 && winPointsValue && !gameOver ?
                <div className="game-results">
                    <h2 className="game-results-title">Puntentotaal</h2>
                    <p>Het team dat als eerste {winPointsValue} punten haalt, wint!</p>
                    <table className="game-results-table">
                        <tbody>
                            <tr>
                                <th></th>
                                <th>
                                    Team van
                                </th>
                                <th>
                                    Punten
                                </th>
                            </tr>
                            {getTeamsSortedByPoints()}
                        </tbody>
                    </table>
                    <button onClick={() => setNextTeam()} className="button-style-inverted">Volgende ronde</button>
                </div> : null}
            {gameOver ?
                <div className="game-win">
                    <Win team={gameOver} />
                </div> : null}
        </div>
    );
};

export default Game;