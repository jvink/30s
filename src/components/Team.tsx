import React, { useState } from 'react';
import ITeam from '../types/Types';
import AddPlayerIcon from 'mdi-react/AccountPlusIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import '../styles/Team.scss';

const Team = (props: any) => {
    const initialState = [{ players: [], points: 0, currentPlayer: 0 }, { players: [], points: 0, currentPlayer: 0 }]
    const [teams, setTeams] = useState<Array<ITeam>>(initialState);
    const [inputs, setInputs] = useState<Array<string>>(['', '']);
    const [winPoints, setWinPoints] = useState<number>(50);

    const addPlayer = (teamIndex: number): void => {
        if (inputs[teamIndex])
            if (inputs[teamIndex].trim() === "") {
            } else {
                setTeams(prevTeams => {
                    return prevTeams.map((team, idx) => {
                        if (teamIndex === idx) {
                            let double = false;
                            team.players.map((player) => {
                                if (player === inputs[teamIndex]) {
                                    double = true;
                                    ToastsStore.error("Spelers mogen niet dezelfde naam hebben!");
                                };
                            });
                            return double ? { ...prevTeams[teamIndex] } : { ...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players, inputs[teamIndex]] };
                        } else {
                            return team;
                        }
                    });
                });
            }
    }

    const removePlayer = (teamIndex: number, playerIndex: number): void => {
        setTeams(prevTeams => {
            return prevTeams.map((team, tidx) => {
                if (teamIndex === tidx) {
                    team.players.map((p, pidx) => {
                        if (playerIndex === pidx) {
                            return { ...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players.splice(playerIndex, 1)] };
                        } else {
                            return team;
                        }
                    });
                    return team;
                } else {
                    return team;
                }
            });
        });
    }

    const addTeam = (): void => {
        if (teams.length < 7) {
            setInputs(inputs.concat(''));
            setTeams(prevTeams => {
                return prevTeams.concat({ players: [], points: 0, currentPlayer: 0 });
            });
        } else {
            ToastsStore.error("U mag maximaal 6 teams!");
        }
    }

    const removeTeam = (teamIndex: number): void => {
        setTeams(prevTeams => {
            const list = prevTeams.filter((i, j) => teamIndex !== j);
            return list;
        });
    }

    const handleSubmit = (e: any, i: number): void => {
        e.preventDefault();
        setInputs(
            inputs.map((value, j) => {
                if (j === i) value = "";
                return value;
            })
        );
    }

    const handleChange = (e: any, i: number): void => {
        let value = e.target.value;
        setInputs(
            inputs.map((v: any, j: number) => {
                if (j === i) {
                    return value;
                }
            })
        );
    }

    const handleChangeWinPoints = (e: any): void => {
        let value = parseInt(e.target.value);
        if (!(value < 0)) {
            setWinPoints(value);
        }
    }

    const handleStartGame = (): void => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].players.length < 2) {
                ToastsStore.error("Team " + (i + 1) + " moet minimaal uit 2 spelers bestaan!");
                return;
            } else {
                if (i === teams.length - 1) {
                    props.onTeamsCreated(teams, winPoints);
                    return;
                } else {
                    ToastsStore.error("Ongeldige teams!");
                }
            }
        }
    }

    return (
        <div>
            <h2 className="game-teams-title">Stel de teams samen!</h2>
            <div className="teams-wrapper">
                <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} lightBackground />
                {teams.map((team, teamIndex) => {
                    return (
                        <div key={teamIndex} className="team-card">
                            <div className="team-card-header">
                                <h2 className="team-card-header-title">Team {teamIndex + 1}</h2>
                                <button onClick={() => removeTeam(teamIndex)} className="team-card-header-button">X</button>
                            </div>
                            {team.players.length > 0 ? <div>
                                {team.players.map((player, playerIndex) => {
                                    return (
                                        <div key={playerIndex} className="team-card-content-player">
                                            <span>{playerIndex + 1}. {player}</span>
                                            <button onClick={() => removePlayer(teamIndex, playerIndex)} className="team-card-content-player-button"><DeleteIcon size={20} color="#7f8fa6" /></button>
                                        </div>
                                    );
                                })}
                            </div> : null}
                            <form onSubmit={(event) => handleSubmit(event, teamIndex)} className="team-card-actions" autoComplete="off">
                                <input disabled={team.players.length === 8 ? true : false} name={"input" + teamIndex} value={inputs[teamIndex] || ''} onChange={(event) => handleChange(event, teamIndex)} placeholder={"Naam speler " + (team.players.length + 1)} className="team-card-actions-input" id={inputs[teamIndex] === "" ? "error" : ""} />
                                <button disabled={team.players.length === 8 ? true : false} onClick={() => addPlayer(teamIndex)} className="team-card-actions-button"><AddPlayerIcon /></button>
                            </form>
                        </div>
                    );
                })}
            </div>
            <div className="team-actions">
                <div className="win"><span className="win-text">Het team dat als eerste </span><input value={winPoints} onChange={(e) => handleChangeWinPoints(e)} type="number" className="win-points"></input><span className="win-text"> punten haalt, wint!</span></div>
                <div>
                    <button onClick={() => addTeam()} disabled={teams.length === 6 ? true : false} className="button-style">Team toevoegen</button>
                    <button onClick={() => handleStartGame()} disabled={teams.length < 2 ? true : false} className="button-style">Start Spel!</button>
                </div>
            </div>
        </div>
    );
}

export default Team;