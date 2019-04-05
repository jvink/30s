import React, { useState, useEffect } from 'react';
import ITeam from '../types/Types';
import Team from './Team';
import Dice from './Dice';
import Words from './Words';
import Countdown from './Countdown';
import Win from './Win';
import Result from './Result';
import '../styles/Game.scss';

const Game = () => {
    const [teams, setTeams] = useState<Array<ITeam>>([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [diceValue, setDiceValue] = useState<number>();
    const [gameStage, setGameStage] = useState<number>(3);
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

    if (gameOver) {
        return <Win team={gameOver} />;
    } else {
        switch (gameStage) {
            case 0:
                return <Team
                    onTeamsCreated={(createdTeams: Array<ITeam>, winPoints: number) => doneTeam(createdTeams, winPoints)} />;
            case 1:
                return <Dice
                    currentTeam={currentTeam}
                    teams={teams}
                    onDiceRolled={(value: number) => doneDiceRoll(value)}
                    maxDice={3} />;
            case 2:
                return <Countdown
                    diceValue={diceValue ? diceValue : 0}
                    currentTeam={currentTeam}
                    teams={teams}
                    doneCountdown={() => doneCountdown()} />;
            case 3:
                return <Words
                    diceValue={diceValue ? diceValue : 0}
                    currentTeamIndex={(teams.findIndex((team) => team === currentTeam)) + 1}
                    currentTeam={currentTeam}
                    currentPoints={correctWords - (diceValue !== undefined ? diceValue : 0)}
                    doneTimer={() => doneTimer()}
                    getCorrectWords={(amount: number) => {
                        setCorrectWords(amount);
                    }} />;
            case 4:
                return <Result
                    teams={teams}
                    winPointsValue={winPointsValue || 0}
                    setNextTeam={() => setNextTeam()} />;
            default:
                return <h1>Not found</h1>;
        }
    }
};

export default Game;