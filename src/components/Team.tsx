import React, { useState } from 'react';
import ITeam from '../types/Types';
import AddPlayerIcon from 'mdi-react/AccountPlusIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import '../styles/Team.css';

const Team = (props: any) => {
    const initialState = [{players: ["Freek Vonk", "Mark Rutte"], points: 22, currentPlayer: 0}, {players: ["Geert Wilders", "Willem Alexander"], points: 10, currentPlayer: 0}, {players: ["Klaas Dijkhof", "Willen van Oranje"], points: 12, currentPlayer: 0}]
    const [teams, setTeams] = useState<Array<ITeam>>(initialState);
    const [inputs, setInputs] = useState<Array<string>>(['', '', '']);

    const addPlayer = (teamIndex: number): void => {
        if (inputs[teamIndex] === "") {
        } else {
            setTeams(prevTeams => {
                return prevTeams.map((team, idx) => {
                    if (teamIndex === idx) {
                        return {...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players, inputs[teamIndex]]};
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
                if(teamIndex === tidx) {
                    team.players.map((p, pidx) => {
                        if (playerIndex === pidx) {
                            return {...prevTeams[teamIndex], players: [...prevTeams[teamIndex].players.splice(playerIndex, 1)]};
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

    const addTeam = ():void => {
        if (teams.length < 7) {
            setInputs(inputs.concat(''));
            setTeams(prevTeams => {
                return prevTeams.concat({players: [], points: 0, currentPlayer: 0});
            });
        } else {
            alert('U mag maar 6 teams max');
        }
    }

    const removeTeam = (teamIndex: number):void => {
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
        setInputs(
            inputs.map((v:any, j: number) => {
                if (j===i) {
                    return v = e.target.value;
                }
            })
        );
    }

    const handleStartGame = (): any => {
        let valid = false;
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            if (team.players.length < 2) {
                valid = false;
                alert('Team ' + (i + 1) +' moet minimaal uit 2 spelers bestaan!');
            } else {
                valid = true;
                if (i === teams.length - 1) {
                    if (valid) {
                        props.onTeamsCreated(teams);
                    } else {
                        alert('Teams ongeldig!');
                    }
                }
            }
        }
    }

    return (
        <div>
            <div className="teams-wrapper">
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
                                            <button onClick={() => removePlayer(teamIndex, playerIndex)} className="team-card-content-player-button"><DeleteIcon size={20}/></button>
                                        </div>
                                    );
                                })}
                            </div> : null}
                            <form onSubmit={(event) => handleSubmit(event, teamIndex)} className="team-card-actions" autoComplete="off">
                                <input disabled={team.players.length === 8 ? true : false} value={inputs[teamIndex]} onChange={(event) => handleChange(event, teamIndex)} placeholder={"Naam speler " + (team.players.length + 1)} className="team-card-actions-input" id={inputs[teamIndex] === "" ? "error" : ""}/>
                                <button disabled={team.players.length === 8 ? true : false} onClick={() => addPlayer(teamIndex)} className="team-card-actions-button"><AddPlayerIcon/></button>
                            </form>
                        </div>
                    );
                })}
            </div>
                <button onClick={() => addTeam()} disabled={teams.length === 6 ? true : false} className="button-style">Team toevoegen</button>
                <button onClick={() => handleStartGame()} disabled={teams.length < 2 ? true : false} className="button-style">Start Spel!</button>
        </div>
    );
}

export default Team;