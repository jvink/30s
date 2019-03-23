import React, { useState } from 'react';
import ITeam from '../types/Types';
import AddPlayerIcon from 'mdi-react/AccountPlusIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import '../styles/Team.css';

const Team = (props: any) => {
    const initialState = [{players: [], points: 0}, {players: [], points: 0}]
    const [teams, setTeams] = useState<Array<ITeam>>(initialState);
    const [inputs, setInputs] = useState<Array<string>>(['', '']);

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
        if (teams.length < 7) {
            setInputs(inputs.concat(''));
            setTeams(prevTeams => {
                return prevTeams.concat({players: [], points: 0});
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
                            <form onSubmit={(event) => handleSubmit(event, teamIndex)} className="team-card-actions">
                                <input disabled={team.players.length === 8 ? true : false} value={inputs[teamIndex]} onChange={(event) => handleChange(event, teamIndex)} placeholder={"Name player " + (team.players.length + 1)} className="team-card-actions-input"/>
                                <button disabled={team.players.length === 8 ? true : false} onClick={() => addPlayer(teamIndex)} className="team-card-actions-button"><AddPlayerIcon/></button>
                            </form>
                        </div>
                    );
                })}
            </div>
                <button onClick={() => addTeam()} disabled={teams.length === 6 ? true : false} className="button-style">Add team</button>
                <button onClick={() => handleStartGame()} disabled={1==1 ? false : true} className="button-style">Start Game</button>
        </div>
    );
}

export default Team;