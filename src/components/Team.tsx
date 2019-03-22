import React, { useState } from 'react';
import ITeam from '../types/Types';

const Team = (props: any) => {
    const faketeams = [{players: ['Freek Vonk', 'Geert Wilders', 'Mark Rutte'], points: 0}, {players: ['Thierry Baudet', 'Kees van der Staaij', 'Jesse Klaver'], points: 0}]
    const [teams, setTeams] = useState<Array<ITeam>>(faketeams);
    const [inputs, setInputs] = useState<Array<string>>(['']);

    const addPlayer = (teamIndex: number): void => {
        setTeams(prevTeams => {
            return prevTeams.map((team, idx) => {
                if(teamIndex === idx) {
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

    const handleSubmit = (e: any, teamIndex: number): void => {
        e.preventDefault();
        setInputs(
            inputs.map((value, j) => {
                if (teamIndex === j) value = "";
                return value;
            })
        );
    }

    const handleChange = (e: any, teamIndex: number): void => {
        setInputs(
            inputs.map((value, j) => {
                if (teamIndex === j) value = e.target.value;
                return value;
            })
        );
    }

    const handleStartGame = (): any => {
        props.onTeamsCreated(teams);
    }

    if (props.dothething) {console.log("AMOUR FIRE")}

    return (
        <div>
            {teams.map((team, teamIndex) => {
                return (
                    <div key={teamIndex}>
                        <h2>Team {teamIndex + 1}</h2>
                        <ul>
                            {team.players.map((player, playerIndex) => {
                                return (
                                    <li key={playerIndex}>
                                        {player}
                                        <button onClick={() => removePlayer(teamIndex, playerIndex)}>X</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <form onSubmit={(event) => handleSubmit(event, teamIndex)}>
                            <label>Player name:</label>
                            <input value={inputs[teamIndex]} onChange={(event) => handleChange(event, teamIndex)}/>
                            <button onClick={() => addPlayer(teamIndex)}>Add player</button>
                        </form>
                        <button onClick={() => removeTeam(teamIndex)}>X</button>
                    </div>
                );
            })}
            <button onClick={() => addTeam()}>Add team</button>
            <button onClick={() => handleStartGame()}>Start Game</button>
        </div>
    );
}

export default Team;