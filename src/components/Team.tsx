import React, { useState } from 'react';
import ITeam from '../types/Types';
import DeleteIcon from 'mdi-react/DeleteIcon';
import '../styles/Team.css';

const Team = (props: any) => {
    const initialState = [{players: [], points: 0}]
    const [teams, setTeams] = useState<Array<ITeam>>(initialState);
    const [inputs, setInputs] = useState<Array<string>>(['']);

    const addPlayer = (teamIndex: number): void => {
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
        setInputs(inputs.concat(''));
        setTeams(prevTeams => {
            return prevTeams.concat({players: [], points: 0});
        });
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
                if (j===i)
                return v = e.target.value;
            })
        );
    }

    const handleStartGame = (): any => {
        props.onTeamsCreated(teams);
    }

    return (
        <div>
            {teams.map((team, teamIndex) => {
                return (
                    <div key={teamIndex} className="team-card">
                        <div className="team-card-header">
                            <h2 className="team-card-header-title">Team {teamIndex + 1}</h2>
                            <button onClick={() => removeTeam(teamIndex)} className="team-card-header-button">X</button>
                        </div>
                        {team.players.length > 0 ? <ul>
                            {team.players.map((player, playerIndex) => {
                                return (
                                    <li key={playerIndex}>
                                        {player}
                                        <button onClick={() => removePlayer(teamIndex, playerIndex)} className="team-card-header-button"><DeleteIcon/></button>
                                    </li>
                                );
                            })}
                        </ul> : null}
                        <form onSubmit={(event) => handleSubmit(event, teamIndex)} className="team-card-content">
                            <input value={inputs[teamIndex]} onChange={(event) => handleChange(event, teamIndex)} placeholder={"Name player " + (team.players.length + 1)} className="team-card-content-input"/>
                            <button onClick={() => addPlayer(teamIndex)} className="team-card-content-button">+</button>
                        </form>
                    </div>
                );
            })}
            <button onClick={() => addTeam()}>Add team</button>
            <button onClick={() => handleStartGame()}>Start Game</button>
        </div>
    );
}

export default Team;